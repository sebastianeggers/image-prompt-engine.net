import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

function App() {

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 72 }}>
        <Outlet />
      </div>

    </>
  );


}

export default App
