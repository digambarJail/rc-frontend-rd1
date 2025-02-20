import { Button } from "pixel-retroui";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authUser, notAuthUser } from "../redux/slices/authSlice";
import { Input } from "pixel-retroui";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  axios.defaults.withCredentials = true;

  const [logData, setLogData] = useState({
    username: "",
    password: "",
  });

  const [userType, setUserType] = useState("individual");
  

  const addData = (e) => {
    const { name, value } = e.target;
    setLogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const logUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        logData,
        { withCredentials: true }
      );
      toast.success("Login Successful!", { position: "top-center", autoClose: 2000 });
      console.log(res.data);

      dispatch(authUser());
      navigate("/instructions"); // Navigate after successful login
    } catch (err) {
      toast.warning("Invalid Username or Password", { position: "top-center", autoClose: 3000 });
      dispatch(notAuthUser());
    }
  };

  return (
    <>
      <div className="login-form h-[90vh] w-full bg--800 flex justify-center items-center ">
        <form className="form-login h-[80%] w-[30%] -[#181818] flex flex-col justify-center items-center gap-[20px]">
          <h1 className="login-text max-md:text-[8vw] text-[#CA5F93] font-bold text-[70px]">
            LOGIN
          </h1>

          <div className="input-boxes h-[30%] w-full bg--500 flex flex-col justify-evenly items-center">
            <Input
              bg="#000"
              textColor="white"
              borderColor="#CA5F93"
              onChange={addData}
              value={logData.username}
              className=" text-white outline-none w-[80%] max-md:w-[80vw] px-[1vw] py-[0vh] max-md:px-[6vw]"
              id="username"
              name="username"
              type="text"
              placeholder={userType === "team" ? "Team Name" : "Username"}
            />

            <Input
              bg="#000"
              textColor="white"
              borderColor="#CA5F93"
              onChange={addData}
              value={logData.password}
              className=" text-white outline-none w-[80%] max-md:w-[80vw] px-[1vw] py-[0vh] max-md:px-[6vw]"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>

          {/* User Type Selection */}
          <div className="user-options py-[5px] w-full flex justify-center gap-10 text-white text-[30px]">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="individual"
                checked={userType === "individual"}
                onChange={() => setUserType("individual")}
                className="mr-2"
              />
              Individual
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="team"
                checked={userType === "team"}
                onChange={() => setUserType("team")}
                className="mr-2"
              />
              Team
            </label>
          </div>

          <Button
            bg="#CA5F93"
            textColor="#4A1237"
            borderColor="#4A1237"
            shadow="#4A1237"
            onClick={logUser}
            className=" w-[360px] max-lg:w-[200px] px-[2vw] py-[0.5vh] font-bold"
          >
            LOGIN
          </Button>
        </form>
      </div>

      {/* Toast container for notifications */}
      <ToastContainer />
    </>
  );
}

export default LoginPage;
