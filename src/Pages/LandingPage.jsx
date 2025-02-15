import { Button } from "pixel-retroui";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate();

  return (
    <>
      <div className="landing-container bg--600 h-[100vh] w-[100vw] flex flex-col justify-center items-center gap-[100px] ">
        <div className="title-rc h-auto w-full flex flex-col justify-center items-center ">
          <h1 className=" custom-shadow3 svg-text-equivalent text-[120px] text-[#CA5F93] leading-[80px] bg--500 ">
            REVERSE
          </h1>
          <h1 className=" custom-shadow3 svg-text-equivalent text-[120px] text-[#CA5F93] leading-[120px] bg--500 ">
            CODING
          </h1>
        </div>
        <Button
          bg="#CA5F93"
          textColor="black"
          borderColor="#1E3445"
          shadow="#1E3445"
          className="  px-[50px] py-[4px] text-[20px] font-bold "
          onClick={() => navigate("/login")}
        >
          <h1 className="custom-shadow2 svg-text-equivalent-forSmallText" >PLAY</h1>
        </Button>
      </div>
    </>
  );
};

export default LandingPage;
