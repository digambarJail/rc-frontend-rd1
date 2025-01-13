import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  
  return (
    <>
      {/* <img className="pixelBG h-[100vh] absolute top-0 w-[100%] object-fill  z-[-1] opacity-[100%] " src={pixelBg}></img> */}

      <div className="layout bg-transparent absolute min-h-[100vh] w-[100vw] flex flex-col justify-center z-[100] items-center overflow-x-hidden">
       
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
