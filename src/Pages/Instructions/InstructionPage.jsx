import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button, Card } from "pixel-retroui";
import "./InstructionStyles.css";

const InstructionPage = () => {
  const [showNext, setShowNext] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="instr-container">
      <h2 className="main-title">INSTRUCTIONS</h2>

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
                Participants are allowed only one login session. Multiple logins
                are not permitted.
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
                The contest will run from 6 PM to 7:30 PM, lasting for a
                duration of 1.5 hours.
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
                All questions are available in the Question Hub. Additionally,
                the correct submission percentage of all the participants for
                each question is displayed.
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
              <h3 className="card-title">#4</h3>
              <p className="card-content">
                Participants must submit their solutions before the contest
                ends. Late submissions will not be accepted.
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
              <h3 className="card-title">#5</h3>
              <p className="card-content">
                Plagiarism in code submissions will result in immediate
                disqualification.
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
              <h3 className="card-title">#6</h3>
              <p className="card-content">
                Participants should refrain from any form of discussion about
                contest problems outside the official discussion forum.
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
              onClick={() => navigate("/lifelines")} // Navigate to NewPage
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
