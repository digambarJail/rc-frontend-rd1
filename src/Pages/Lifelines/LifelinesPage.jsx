import React from "react";
import { Button } from "pixel-retroui";
import Info from "../../components/InfoCard.jsx";
// import double from "./assets/icons/doublePoints.svg";
// import freeze from "./assets/icons/freeze.svg";
// import skip from "./assets/icons/skip.svg";
import "./LifelinesStyles.css";
import { useNavigate } from "react-router-dom";


function LifelinesPage() {

  const navigate = useNavigate();
  return (
    <div className="container">
      {/* <Navbar /> */}
      <div className="Lifelines ">LIFELINES</div>
      <div className="flex-container">
        <div className="flex-item">
          <Info
            number="1"
            // img={skip}
            desc="Skip"
            title="Skip"
            more="Allows you to Skip a question, Will be available from the start and can be only used once"
          ></Info>
        </div>
        <div className="flex-item">
          <Info
            number="2"
            // img={freeze}
            desc="Freeze Time"
            title="Freeze Time"
            more="Increase your time by two minutes, Available after a streak of 3 questions"
          ></Info>
        </div>
        <div className="flex-item">
          <Info
            number="3"
            // img={double}
            desc="Double Points"
            title="Double Points"
            more="available after streak of 4 questions (marks: +10/-2 for 1st attempt, +4/-2 for 2nd attempt) for 2 min
"
          ></Info>
        </div>
      </div>
      <div className="next">
        <Button
          className="next-button"
          shadowColor="#bc6f90"
          borderColor="#bc6f90"
          bg="#0d1234"
          onClick={() => navigate('/questions')}

        >
          NEXT
        </Button>
      </div>
    </div>
  );
}

export default LifelinesPage;