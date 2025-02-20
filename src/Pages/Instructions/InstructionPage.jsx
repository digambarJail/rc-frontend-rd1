import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button, Card } from "pixel-retroui";
import "./InstructionStyles.css";

const InstructionPage = () => {
  const [showNext, setShowNext] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function
  // const onProceedClick = () => {

    const [instructions, setInstructions] = useState([
      {
        id: 1,
        title: "Participants are allowed only one login session. Multiple logins are not permitted.",
      },
      {
        id: 1,
        title: "Participants are allowed only one login session. Multiple logins are not permitted.",
      },
      {
        id: 1,
        title: "Participants are allowed only one login session. Multiple logins are not permitted.",
      },
    ]);
  return (
    <div className="instr-container">
      <h2 className="main-title">{showNext ? "LIFELINES" : "INSTRUCTIONS" }</h2>

      {/* Card Container */}
      <div className="card-container">
        {!showNext ? (
          <>
            {/* First Three Cards */}
            <Card
              bg="rgba(57, 56, 103, 1)"
              textColor="#ff79c6"
              borderColor="#451c44"
              shadowColor="rgba(30, 52, 69, 1)"
            >
              {/* <img src="src/assets/shield.png" alt="shield" className="card-icon" /> */}
              <h3 className="card-title">#1</h3>
              <p className="card-content">
              Participants are allowed to take a 30-minute test within the designated time window, with the contest running from 8:00 PM to 11:00 PM.
              </p>
            </Card>

            <Card
              bg="rgba(57, 56, 103, 1)"
              textColor="#ff79c6"
              borderColor="#451c44"
              shadowColor="rgba(30, 52, 69, 1)"
            >
              {/* <img src="src/assets/electronic.png" alt="electronic" className="card-icon" /> */}
              <h3 className="card-title">#2</h3>
              <p className="card-content">
              The marking scheme awards +5 points for each correct submission and -2 points for each incorrect submission. Participants are allowed **up to 2 attempts** to answer a question.
              </p>
            </Card>

            <Card
              bg="rgba(57, 56, 103, 1)"
              textColor="#ff79c6"
              borderColor="#451c44"
              shadowColor="rgba(30, 52, 69, 1)"
            >
              {/* <img src="src/assets/notepad.png" alt="notepad" className="card-icon" /> */}
              <h3 className="card-title">#3</h3>
              <p className="card-content">
              Participants are permitted to use each lifeline only once during the test. Using a lifeline will reset the streak.
              </p>
            </Card>
          </>
        ) : (
          <>
            {/* Next Three Cards */}
            <Card
              bg="rgba(57, 56, 103, 1)"
              textColor="#ff79c6"
              borderColor="#451c44"
              shadowColor="rgba(30, 52, 69, 1)"
            >
              {/* <img
                src="src/assets/shield.png"
                alt="time"
                className="card-icon"
              /> */}
              <h3 className="card-title">SKIP</h3>
              <p className="card-content">
              Activated after 3 consecutive correct answers, allowing you to skip the current question without penalty.
              </p>
            </Card>

            <Card
              bg="rgba(57, 56, 103, 1)"
              textColor="#ff79c6"
              borderColor="#451c44"
              shadowColor="rgba(30, 52, 69, 1)"
            >
              {/* <img
                src="src/assets/electronic.png"
                alt="rules"
                className="card-icon"
              /> */}
              <h3 className="card-title">TIME BOOST</h3>
              <p className="card-content">
              Activated after a streak of 4 correct answers, this lifeline adds 2 extra minutes to your timer.
              </p>
            </Card>

            <Card
              bg="rgba(57, 56, 103, 1)"
              textColor="#ff79c6"
              borderColor="#451c44"
              shadowColor="rgba(30, 52, 69, 1)"
            >
              {/* <img
                src="src/assets/notepad.png"
                alt="warning"
                className="card-icon"
              /> */}
              <h3 className="card-title">DOUBLE UP</h3>
              <p className="card-content">
              Activated after a streak of 5 correct answers, this lifeline doubles your score for a correct answer, with no penalty for a wrong attempt.
              </p>
            </Card>
          </>
        )}
      </div>

      {/* Button Container */}
      <div className="button-container">
        {/* <Button
          bg="#1a1b41"
          textColor="rgba(238, 140, 174, 1)"
          borderColor="rgba(238, 140, 174, 1)"
          className="next-buttons"
          onClick={() => setShowNext(!showNext)}
        >
          {showNext ? "BACK" : "NEXT"}
        </Button> */}

        {showNext ? (
          <div className="button-containers">
            <Button
            bg="#1a1b41"
            textColor="rgba(238, 140, 174, 1)"
            borderColor="rgba(238, 140, 174, 1)"
            className="next-buttons"
            onClick={() => setShowNext(!showNext)}
          >
            BACK
          </Button>
            <Button
              bg="#1a1b41"
              textColor="rgba(238, 140, 174, 1)"
              borderColor="rgba(238, 140, 174, 1)"
              className="next-buttons"
              onClick={() => navigate("/questions")} // Navigate to NewPage
            >
              Proceed
            </Button>
          </div>
        ) : (
          <Button
            bg="#1a1b41"
            textColor="rgba(238, 140, 174, 1)"
            borderColor="rgba(238, 140, 174, 1)"
            className="next-buttons"
            onClick={() => setShowNext(!showNext)}
          >
            NEXT
          </Button>
        )}
      </div>
    </div>
  );
};

export default InstructionPage;
