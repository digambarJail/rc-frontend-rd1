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
      toast.success("Login Successful!", { position: "top-center" });
      console.log(res.data);

      dispatch(authUser());
      navigate("/dashboard"); // Navigate after successful login
    } catch (err) {
      toast.warning("Invalid Username or Password", { position: "top-center" });
      dispatch(notAuthUser());
    }
  };

  return (
    <>
      <div className="login-form h-[90vh] w-full bg--800 flex justify-center items-center ">
        <form className="form-login h-[80%] w-[30%] -[#181818] flex flex-col justify-center items-center gap-[20px]  ">
          <h1 className="login-text max-md:text-[8vw] text-[#CA5F93] font-bold text-[70px]">
            LOGIN
          </h1>

          <div className="input-boxes h-[30%] w-full bg--500 flex flex-col justify-evenly items-center ">
            {/* <input
              onChange={addData}
              value={logData.email}
              className=" text-white rounded-full outline-none w-[80%] max-md:w-[80vw] px-[2vw] py-[2vh] max-md:px-[6vw] bg-zinc-800 "
              id="email"
              name="email"
              type="email"
              placeholder="Email"
            /> */}
            <Input
              bg="#000"
              textColor="white"
              borderColor="#CA5F93"
              onChange={addData}
              value={logData.username}
              className=" text-white outline-none w-[80%] max-md:w-[80vw] px-[1vw] py-[0vh] max-md:px-[6vw] "
              id="username"
              name="username"
              type="username"
              placeholder="Username"
            />

            {/* <input
              onChange={addData}
              value={logData.password}
              className=" text-white rounded-full outline-none w-[80%] max-md:px-[6vw] max-md:w-[80vw]  px-[2vw] py-[2vh] bg-zinc-800 "
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            /> */}
            <Input
              bg="#000"
              textColor="white"
              borderColor="#CA5F93"
              onChange={addData}
              value={logData.password}
              className=" text-white outline-none w-[80%] max-md:w-[80vw] px-[1vw] py-[0vh] max-md:px-[6vw] "
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>

          {/* <button
            onClick={logUser}
            className=" w-[360px] max-lg:w-[200px] px-[2vw] py-[1vh] text-white bg-[#8A72FF] border-[1px]  hover:bg-transparent  hover:bg-[#5840d0]font-bold rounded-full "
          >
            Login
          </button> */}

          <Button
            bg="#CA5F93"
            textColor="#4A1237"
            borderColor="#4A1237"
            shadow="#4A1237"
            onClick={logUser}
             className=" w-[360px] max-lg:w-[200px] px-[2vw] py-[0.5vh]   font-bold  "
          >
            LOGIN
          </Button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
