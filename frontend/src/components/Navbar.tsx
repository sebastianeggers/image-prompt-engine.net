import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar: FC = () => {
  const navigate = useNavigate();
  return (
    <HStack
      as="header"
      p={3}
      background={"blue.50"}
      borderBottom="1px"
      width='100%'
    >
      <Menu>
        <MenuButton background="#aaaaaa" as={Button} rightIcon={<ChevronDownIcon />}>
          <HamburgerIcon />
        </MenuButton>
        <MenuList zIndex={130}>
          <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
          <MenuItem onClick={() => navigate('/midjourney/prompt-generator')}>Midjourney Prompt Generator</MenuItem>
          <MenuItem onClick={() => navigate('/guides/getting-started-with-midjourney')}>Getting Started with Midjourney</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  )
};