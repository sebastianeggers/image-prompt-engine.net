import { Button, HStack } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar: FC = () => {
  const navigate = useNavigate();
  return (
    <HStack as="header" background={'black'} p={3} style={{ position: 'fixed', width: '100%', height: 64, zIndex: 101 }}>
      <Button colorScheme="blue" onClick={() => navigate('/')}>Home</Button>
      <Button colorScheme="blue" onClick={() => navigate('/midjourney/prompt-generator')}>Midjourney Prompt Generator</Button>
      <Button colorScheme="blue" onClick={() => navigate('/guides/getting-started-with-midjourney')}>Getting Started with Midjourney</Button>
    </HStack>
  )
};