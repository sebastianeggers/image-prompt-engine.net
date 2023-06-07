variable "aws_access_key" {
  type        = string
  description = "AWS access key"
}
variable "aws_secret_key" {
  type        = string
  description = "AWS secret key"
}
variable "aws_region" {
  type        = string
  description = "AWS region"
}

variable "domain_name" {
  type        = string
  description = "The full domain name"
}

variable "bucket_name" {
  description = "The name of the S3 Bucket. Should be identical to the domain_name"
  type        = string
}

variable "txt_records" {
  description = "List of TXT records"
  type        = list(string)
  default     = []
}
