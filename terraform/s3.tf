resource "aws_s3_bucket" "example" {
  bucket        = var.bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "example-access-block" {
  bucket = aws_s3_bucket.example.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "example-config" {
  bucket = aws_s3_bucket.example.bucket
  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_bucket_policy" "example-policy" {
  depends_on = [aws_s3_bucket_public_access_block.example-access-block]
  bucket     = aws_s3_bucket.example.id
  policy     = templatefile("s3-policy.json", { bucket = var.bucket_name })
}

resource "null_resource" "s3_objects" {
  depends_on = [aws_s3_bucket_policy.example-policy]
  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    command = <<-EOT
        pnpm run --prefix ../frontend build
        aws s3 sync ../frontend/dist s3://${var.bucket_name} --exclude "*" --include '*.html' --content-type 'text/html'
        aws s3 sync ../frontend/dist s3://${var.bucket_name} --exclude "*.html"
    EOT
  }
}

locals {
  s3_origin_id = "myS3Origin"
}

// Certificate
resource "aws_acm_certificate" "cert" {
  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

// Zone
data "aws_route53_zone" "zone" {
  name         = var.domain_name
  private_zone = false
  vpc_id       = ""
}

// Route 53 Record
resource "aws_route53_record" "www" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.zone.zone_id
}

// Certificate Validation
resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.www : record.fqdn]
}

// Cloudfront Distribution
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.example.bucket_regional_domain_name
    origin_id   = local.s3_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Some comment"
  default_root_object = "index.html"

  # If there is a 404, return index.html with a HTTP 200 Response
  custom_error_response {
    error_caching_min_ttl = 3000
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  /*
  logging_config {
    include_cookies = false
    bucket          = "${var.bucket_name}.s3.amazonaws.com"
    prefix          = "cloudfront_logs"
  }
  */

  aliases = [var.domain_name]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  ordered_cache_behavior {
    path_pattern     = "/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false
      headers      = ["Origin"]

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  /*
  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = []
    }
  }
  */
  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    ssl_support_method  = "sni-only"
  }

}

resource "aws_route53_record" "record_a" {
  zone_id = data.aws_route53_zone.zone.id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = replace(aws_cloudfront_distribution.s3_distribution.domain_name, "/[.]$/", "")
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}

output "s3_website_endpoint" {
  value = aws_s3_bucket_website_configuration.example-config.website_endpoint
}

output "cdn_domain" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "domain" {
  value = aws_route53_record.record_a.name
}
