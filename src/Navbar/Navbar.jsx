import { Link } from "react-router-dom";
import { Button } from "pixel-retroui";

const Navbar = () => {
  return (
    <>
      <div className="navbar h-[100px] w-[100vw] flex justify-between items-center px-[80px] bg--500 fixed top-0 z-[1000] ">
        <h1 className="text-[40px] text-[#FFD1E8]">RC</h1>

        <div className="nav-links text-[24px] bg--500 h-full w-[40%] flex justify-between items-center text-[#FFD1E8] ">
          <Link to="/instructions" >Instructions</Link>
          <Link to="/leaderboard" >Leaderboard</Link>
          <Button
            bg="#CA5F93"
            textColor="black"
            borderColor="#1E3445"
            shadow="#1E3445"
            className="px-[20px] py-[2px] text-[16px] font-bold "
          >
            <h1 className="custom-shadow2 svg-text-equivalent-forSmallText" >LOGIN</h1>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;