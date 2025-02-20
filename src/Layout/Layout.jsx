import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import RcBack from "../assets/RC_BG.png";

const Layout = () => {
  useEffect(() => {
    // ❌ Disable Right-Click
    document.addEventListener("contextmenu", (event) => event.preventDefault());

    // ❌ Disable Key Combinations
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J" || event.key === "C")) || 
        (event.ctrlKey && event.key === "U")
      ) {
        event.preventDefault();
      }
    });

    // ❌ Detect DevTools Open
    const checkDevTools = setInterval(() => {
      const before = new Date().getTime();
      debugger; // Pauses script execution when DevTools is open
      const after = new Date().getTime();
      if (after - before > 100) {
        alert("Inspecting is disabled!");
        window.location.href = "https://google.com"; // Redirect user
      }
    }, 3000);

    return () => {
      clearInterval(checkDevTools);
    };
  }, []);

  return (
    <>
      <img className="object-cover z-[1] absolute h-full w-full opacity-[40%]" src={RcBack} alt="RC_BACKGROUND" />

      <div className="layout bg-transparent min-h-[100vh] w-[100vw] flex flex-col justify-center z-[100] items-center overflow-x-hidden relative">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
