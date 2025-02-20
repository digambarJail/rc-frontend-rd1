// import React from "react";
// import { Button } from "pixel-retroui";
// import Info from "../../components/InfoCard.jsx";
// // import double from "./assets/icons/doublePoints.svg";
// // import freeze from "./assets/icons/freeze.svg";
// // import skip from "./assets/icons/skip.svg";
// import "./LifelinesStyles.css";
// import { useNavigate } from "react-router-dom";


// function LifelinesPage() {

//   const navigate = useNavigate();
//   return (
//     <div className="container">
//       {/* <Navbar /> */}
//       <div className="Lifelines ">LIFELINES</div>
//       <div className="flex-container">
//         <div className="flex-item">
//           <Info
//             number="1"
//             // img={skip}
//             desc="Skip"
//             title="Skip"
//             more="Allows you to Skip a question, Will be available from the start and can be only used once"
//           ></Info>
//         </div>
//         <div className="flex-item">
//           <Info
//             number="2"
//             // img={freeze}
//             desc="Freeze Time"
//             title="Freeze Time"
//             more="Increase your time by two minutes, Available after a streak of 3 questions"
//           ></Info>
//         </div>
//         <div className="flex-item">
//           <Info
//             number="3"
//             // img={double}
//             desc="Double Points"
//             title="Double Points"
//             more="available after streak of 4 questions (marks: +10/-2 for 1st attempt, +4/-2 for 2nd attempt) for 2 min
// "
//           ></Info>
//         </div>
//       </div>
//       <div className="next">
//         <Button
//           className="next-button"
//           shadowColor="#bc6f90"
//           borderColor="#bc6f90"
//           bg="#0d1234"
//           onClick={() => navigate('/questions')}

//         >
//           NEXT
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default LifelinesPage;

import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Card } from 'pixel-retroui';

const Lifelines = ({ currentQuestionId, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLifeline, setSelectedLifeline] = useState(null);

    // Lifelines array
    const lifelines = [
        {
            id: "1",
            title: "Skip Question",
            description: "Skip the current question without losing points.",
            type: "skip",
            used: false,
        },
        {
            id: "2",
            title: "Double Answer",
            description: "Get two attempts at the answer.",
            type: "double",
            used: false,
        },
        {
            id: "3",
            title: "Freeze Timer",
            description: "Pause the timer for an additional 2 minutes.",
            type: "freeze",
            used: true,
        },
    ];

    const handleLifelineUse = async (lifelineType) => {
        try {
            let payload = { currentQuestionId };

            if (lifelineType === "double") {
                payload.answer = answer;
            }

            let endpoint;
            switch (lifelineType) {
                case "skip":
                    endpoint = "/api/skip-lifeline";
                    break;
                case "freeze":
                    endpoint = "/api/increase-timer-lifeline";
                    break;
                case "double":
                    endpoint = "/api/double-lifeline";
                    break;
                default:
                    console.error("Invalid lifeline type");
                    return;
            }

            const response = await axios.post(endpoint, payload);
            // console.log(`${lifelineType} lifeline response:`, response.data);
        } catch (error) {
            console.error(`${lifelineType} lifeline error:`, error.response?.data || error.message);
        }
    };

    return (
        <div>
            <Card
                bg="#393867"
                textColor="#e2b3cc"
                borderColor="#451c44"
                shadowColor="black"
                className="score w-full lg:w-[17vw] lg:h-[37vh] sm:h-[30vh] flex-col justify-center items-center shadow-black font-custom"
            >
                <svg viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <text
                        x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                        fill="#e2b3cc" stroke="#4a1237" strokeWidth="10" paintOrder="stroke fill"
                        className="custom-shadow3 font-normal lg:text-[4vw] max-lg:text-[2vh]"
                    >
                        LIFELINES
                    </text>
                </svg>

                <div className="flex flex-col items-center gap-2 w-full">
                    {lifelines.map((lifeline) => (
                        <Card
                            key={lifeline.id}
                            bg="#ca5f93"
                            textColor="#e2b3cc"
                            borderColor="#451c44"
                            shadowColor="black"
                            className="w-[90%] h-[40px] flex items-center px-2 shadow-[#c381b5]"
                        >
                            <svg viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                                <text
                                    x="1%" y="50%" dominantBaseline="middle"
                                    fill="#e2b3cc" stroke="#4a1237" strokeWidth="10" paintOrder="stroke fill"
                                    className="custom-shadow3 font-normal lg:text-[5vw] max-lg:text-[2vh]"
                                >
                                    {lifeline.title}
                                </text>
                            </svg>

                            <div className="flex gap-2">
                                <button onClick={() => { setSelectedLifeline(lifeline); setIsOpen(true); }}>
                                    <FontAwesomeIcon icon={faCircleInfo} className="text-[#4a0f35] text-lg" />
                                </button>
                                <button
                                    onClick={() => handleLifelineUse(lifeline.type)}
                                    disabled={lifeline.used}
                                    className={`text-[#4a0f35] text-lg ${lifeline.used ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    <FontAwesomeIcon icon={faCirclePlay} />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Card>

            {isOpen && selectedLifeline && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
                    onClick={() => setIsOpen(false)}
                    style={{ zIndex: 100 }}
                >
                    <div
                        className="p-6 rounded-lg text-center w-[300px] h-[300px] bg-[#1b1230] shadow-[0_0_8px_#e2b3cc] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-2" style={{ color: "#e2b3cc", fontSize: "35px", marginTop: '50px' }}>
                            {selectedLifeline.title}
                        </h2>
                        <br />
                        <p className="mb-4" style={{ color: "#e2b3cc", fontSize: "15px" }}>
                            {selectedLifeline.description}
                        </p>
                        <button
                            className="absolute text-white text-lg"
                            style={{ fontFamily: "MyCustomFont", right: '10px', top: '10px', color: "#e2b3cc" }}
                            onClick={() => setIsOpen(false)}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Add PropTypes for validation
Lifelines.propTypes = {
    currentQuestionId: PropTypes.string.isRequired,
    answer: PropTypes.string, // Optional string
};

export default Lifelines;
