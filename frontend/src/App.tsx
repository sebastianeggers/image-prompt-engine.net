import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { FC } from "react";
import { Footer } from "./components/Footer";
import { Flex } from "@chakra-ui/react";

const App: FC = () => {
  return (
    <Flex
      direction='column'
      justifyContent='space-between'
      minHeight='100vh'
    >
      <div>
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </Flex>
  );
}

export default App
