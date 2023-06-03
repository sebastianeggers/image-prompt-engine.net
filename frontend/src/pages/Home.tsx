import { Divider, HStack, Heading, Image, Link, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";


export const Home: FC = () => {
  return (
    <VStack maxWidth={800} padding={5} marginLeft='auto' marginRight='auto'>

      <VStack>
        <Heading>Guide: Getting Started with Midjourney</Heading>
        <HStack>
          <Text>You are looking to get started with AI generated images using Midjourney? <Link as={RouterLink} to="guides/getting-started-with-midjourney">Start here</Link>!</Text>
          <Link as={RouterLink} to="guides/getting-started-with-midjourney"><Image src="/nav-getting-started.jpg" /></Link>
        </HStack>
      </VStack>

      <Divider marginTop={5} marginBottom={5} />

      <VStack>
        <Heading>Midjourney Prompt Generator</Heading>
        <HStack>
          <Link as={RouterLink} to="midjourney/prompt-generator"><Image src="/nav-midjourney-prompt-generator.jpg" /></Link>
          <Text>The <Link as={RouterLink} to="midjourney/prompt-generator">Midjourney Prompt Generator</Link> helps you to generate more varied prompts and achieve better results.</Text>
        </HStack>
      </VStack>
    </VStack>
  )
};