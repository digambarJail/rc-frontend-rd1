import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import RcBack from "../assets/RC_BG.png";

const Layout = () => {
  
  return (
    <>
        <img className="object-cover z-[1] absolute h-full w-full opacity-[40%]"  src={RcBack} alt="RC_BACKGROUND" />
      
      <div className="layout bg-transparent  min-h-[100vh] w-[100vw] flex flex-col justify-center z-[100] items-center overflow-x-hidden relative">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
