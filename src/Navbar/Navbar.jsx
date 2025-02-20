import { Link, useNavigate } from "react-router-dom";
import { Button } from "pixel-retroui";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { notAuthUser } from "../redux/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuth);

  const logout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/logout`,
        { withCredentials: true }
      );

      dispatch(notAuthUser());
      toast.success("Logout successful!", { position: "top-right", autoClose: 2000 });
      nav("/");
    } catch (error) {
      toast.error("Logout failed! Try again.", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <>
      <div className="navbar h-[100px] w-[100vw] flex justify-between items-center px-[80px] bg--500 fixed top-0 z-[1000] ">
        <Link to="/" className="text-[40px] text-[#FFD1E8]">
          RC
        </Link>

        <div className="nav-links text-[24px] bg--500 h-full w-[40%] flex justify-between items-center text-[#FFD1E8] ">
          {isAuthenticated ? (
            <>
              <Link to="/instructions">Instructions</Link>
              <Link to="/questions">Questions</Link>
              <Link to="/leaderboard">Leaderboard</Link>
              <Button
                bg="#CA5F93"
                textColor="black"
                borderColor="#4A1237"
                shadow="#4A1237"
                className="px-[20px] py-[2px] text-[16px] font-bold "
                onClick={logout}
              >
                <h1 className="text-[#4A1237]">LOGOUT</h1>
              </Button>
            </>
          ) : null}
        </div>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer />
    </>
  );
};

export default Navbar;
