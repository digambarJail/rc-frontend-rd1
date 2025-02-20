// import React, { useState, useEffect } from 'react';
// import { Card, Input, Button } from 'pixel-retroui';
// import './QuestionStyles.css';
// // import Lifelines from './Lifelines/Lifelines';
// import Lifelines from '../../components/Lifelines/Lifelines';
// import Timer from '../../components/Timer/Timer';
// import { BrowserRouter } from 'react-router-dom';
// import FullScreenEnforcer from "../../components/Fullscreen/Fullscreen";

// function QuestionPage() {

//     const [question, setQuestion] = useState([1]); // Store question as an array
//     const [answer, setAnswer] = useState({ input1: "", input2: "" });
//     const [input1Disabled, setInput1Disabled] = useState(false);
//     const [input2Disabled, setInput2Disabled] = useState(true);
//     const [responseMessage, setResponseMessage] = useState("");
//     const [score, setScore] = useState(0); // Track the score

//     useEffect(() => {
//         fetchQuestions();
//     }, []);

//     const fetchQuestions = async () => {
//         try {
//             const res = await fetch("http://localhost:5000/api/question");
//             const data = await res.json();
//             setQuestion([data.question]); // Wrap the single question in an array
//             setAnswer({ input1: "", input2: "" }); // Clear inputs
//         } catch (error) {
//             console.error("Error fetching the question", error);
//         }
//     };

//     const handleSubmit = async (id, attempt) => {
//         try {
//             const res = await fetch("http://localhost:5000/api/submit", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     id: id,
//                     answer: attempt === 1 ? answer.input1 : answer.input2
//                 }),
//             });

//             const data = await res.json();

//             if (data.correct) {
//                 setScore(prevScore => prevScore + 1); // Increase score on correct answer
//                 setAnswer({ input1: "", input2: "" });
//                 setInput1Disabled(false);
//                 setInput2Disabled(true);
//                 fetchQuestions();
//             } else {
//                 if (attempt === 1) {
//                     setInput1Disabled(true);
//                     setInput2Disabled(false);
//                 } else {
//                     setScore(prevScore => prevScore - 1); // Decrease score on second incorrect attempt
//                     setAnswer({ input1: "", input2: "" });
//                     setInput1Disabled(false);
//                     setInput2Disabled(true);
//                     fetchQuestions();
//                 }
//             }
//         } catch (error) {
//             console.error("Error submitting answer: ", error);
//         }
//     };




//     return (
//         <>
//         <FullScreenEnforcer/>

//             <div className="flex flex-col lg:flex-row bg--600 w-full mt-5 ml-0 p-0 justify-evenly items-center lg:items-center">
//                 {/* Left Side: Question Card */}

//                 <div className=" bg--500 lg:w-[70%] flex flex-col justify-center mt-8 sm:mt-16 lg:mt-8">
//                     {/* <BrowserRouter> */}
//                         <Timer />

//                     {/* </BrowserRouter> */}
//                     <Card
//                         bg="#393867"
//                         textColor="#e2b3cc"
//                         borderColor="#451c44"
//                         shadowColor="black"
//                         className="w-full lg:w-[65vw] sm:w-[50vw] h-auto lg:h-[50vh] flex flex-col p-4">
//                         {question.length > 0 ? (
//                             question.map((q) => (
//                                 <div key={q.id} className="flex flex-col items-center">
//                                     <svg viewBox="0 0 350 100" xmlns="http://www.w3.org/2000/svg" className="w-[100%] h-[30%]">
//                                         <text
//                                             x="50%"
//                                             y="50%"
//                                             dominantBaseline="middle"
//                                             textAnchor="middle"
//                                             fill="#e2b3cc"
//                                             stroke="#4a1237"
//                                             strokeWidth="7"
//                                             paintOrder="stroke fill"
//                                             className="font-custom sm:text-[5vw] lg:text-[3vw] max-lg:text-[5vh] custom-shadow3"
//                                         >
//                                             QUESTION {q.id}
//                                         </text>
//                                     </svg>
//                                     <p className="text-[3vw] sm:text-[2vw] lg:text-[2vw] text-center mt-2">{q.text}</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-center">Loading question...</p>
//                         )}
//                     </Card>
//                 </div>


//                 {/* Right Side: Score & Lifelines (Stacked) */}
//                 <div className="flex flex-col lg:w-[17vw] lg:ml-5 sm:ml-0 ">
//                     {/* Score Card */}
//                     <div >
//                         <Card
//                             bg="#393867"
//                             textColor="#e2b3cc"
//                             borderColor="#451c44"
//                             shadowColor="black"
//                             className="score w-full lg:w-[17vw] h-[8vh] flex lg:mt-[110px] justify-center items-center shadow-black font-custom">
//                             <svg viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
//                                 <text
//                                     x="50%"
//                                     y="50%"
//                                     dominantBaseline="middle"
//                                     textAnchor="middle"
//                                     fill="#e2b3cc"
//                                     stroke="#4a1237"
//                                     strokeWidth="11"
//                                     paintOrder="stroke fill"
//                                     className="custom-shadow3 font-normal text-[4vw] lg:text-[4vw]"
//                                 >
//                                     SCORE: {score}
//                                 </text>
//                             </svg>
//                         </Card>
//                     </div>

//                     {/* Lifeline Card */}
//                     <div className=" lg:mt-5">
//                         <Lifelines />
//                     </div>
//                 </div>
//             </div>

//             {/* Inputs & Submit Section */}
//             <div className="w-full flex flex-col lg:flex-row items-center justify-start mt-5 lg:mt-10 bg--50 gap-4">
//                 {// question?.length > 0 &&
//                     question.map((q) => (
//                         <div key={q.id} className="flex flex-col lg:flex-row gap-9 justify-between items-center px-[5vw] w-full bg--700 max-w-[90%] lg:max-w-[100%]">
//                             {/* Input 1 */}
//                            <div className="ans-container h-full w-[60%] flex justify-between items-center ">
//                            <Input
//                                 type="text"
//                                 bg="#393867"
//                                 textColor="#e2b3cc"
//                                 borderColor="#451c44"
//                                 shadowColor="black"
//                                 className="lg:w-[300px] h-[7.5vh] font-custom text-center"
//                                 placeholder="INPUT 1"
//                                 value={answer.input1}
//                                 onChange={(e) => setAnswer({ ...answer, input1: e.target.value })}
//                                 disabled={input1Disabled}
//                             />

//                             {/* Input 2 */}
//                             <Input
//                                 type="text"
//                                 bg="#393867"
//                                 textColor="#e2b3cc"
//                                 borderColor="#451c44"
//                                 shadowColor="black"
//                                 className="lg:w-[300px] h-[7.5vh] font-custom text-center"
//                                 placeholder="INPUT 2"
//                                 value={answer.input2}
//                                 onChange={(e) => setAnswer({ ...answer, input2: e.target.value })}
//                                 disabled={input2Disabled}
//                             />
//                            </div>

//                             {/* Submit Button */}
//                             <Button
//                                 type="text"
//                                 bg="#ca5f93"
//                                 textColor="#e2b3cc"
//                                 borderColor="#451c44"
//                                 shadowColor="black"
//                                 className=" shadow-[#451c44] lg:w-[10vw] h-[7.5vh] flex justify-center"
//                                 onClick={() => handleSubmit(q.id, input1Disabled ? 2 : 1)}
//                             >
//                                 <svg viewBox="0 0 400 170" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
//                                     <text
//                                         x="50%"
//                                         y="50%"
//                                         dominantBaseline="middle"
//                                         textAnchor="middle"
//                                         fill="#e2b3cc"
//                                         stroke="#4a1237"
//                                         strokeWidth="17"
//                                         paintOrder="stroke fill"
//                                         className="custom-shadow3 font-normal text-[7vw] lg:text-[4vw]"
//                                     >
//                                         SUBMIT
//                                     </text>
//                                 </svg>
//                             </Button>
//                         </div>
//                     ))}
//                 {responseMessage && <p className="mt-4 text-lg text-center">{responseMessage}</p>}
//             </div>





//         </>
//     )
// }

// export default QuestionPage;

import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'pixel-retroui';
import 'pixel-retroui/dist/index.css';
import "./QuestionStyles.css";
import Lifelines from '../Lifelines/LifelinesPage';


function Rashmi_Question() {
    const [questions, setQuestion] = useState([123]);
    const [answer, setAnswer] = useState({ input1: "", input2: "" });
    const [input1Disabled, setInput1Disabled] = useState(false);
    const [input2Disabled, setInput2Disabled] = useState(true);
    const [score, setScore] = useState(0); // Track the score
    const [timeLeft, setTimeLeft] = useState(0); // Track time left for the timer

    // Placeholder for user ID (you can fetch this from your backend or pass it as a prop)
    const currentUserId = "example-user-id"; // Replace this with the actual user ID

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/start"); // Change this to your backend URL if necessary
            const data = await res.json();
            console.log("DATA: ",data );
            setQuestion([data.questions]); // Store question in state
            setAnswer({ input1: "", input2: "" }); // Clear inputs
            setTimeLeft(data.timeLeft); // Set time left
            startCountdown(data.timeLeft); // Start countdown timer
        } catch (error) {
            console.error("Error fetching the question", error);
        }
    };

    const startCountdown = (initialTime) => {
        let remainingTime = initialTime;
        const timerInterval = setInterval(() => {
            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                alert("Time's up!");
                return;
            }
            remainingTime -= 1000; // Decrease by 1 second
            setTimeLeft(remainingTime);
        }, 1000);
    };

    // Utility function to format time as "mm:ss"
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleSubmit = async (question_id, attempt) => {
        try {
            const res = await fetch("http://localhost:5000/api/next", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentUserId, // Include user ID
                    question_id,
                    answer: attempt === 1 ? answer.input1 : answer.input2
                }),
            });

            const data = await res.json();

            if (data.correct) {
                setScore(prevScore => prevScore + 1);
                setAnswer({ input1: "", input2: "" });
                setInput1Disabled(false);
                setInput2Disabled(true);
                fetchQuestions();
            } else {
                if (attempt === 1) {
                    setInput1Disabled(true);
                    setInput2Disabled(false);
                } else {
                    setScore(prevScore => prevScore - 1);
                    setAnswer({ input1: "", input2: "" });
                    setInput1Disabled(false);
                    setInput2Disabled(true);
                    fetchQuestions();
                }
            }
        } catch (error) {
            console.error("Error submitting answer: ", error);
        }
    };

    return (
        <>

            <div className="flex flex-col lg:flex-row w-full mt-5 ml-0 p-0 justify-evenly items-center lg:items-center">
                {/* Left Side: Question Card */}
                <div className="w-full lg:w-[65vw] flex flex-col justify-center mt-8 sm:mt-16 lg:mt-8">
                    <h2>{formatTime(timeLeft)}</h2>

                    <Card
                        bg="#393867"
                        textColor="#e2b3cc"
                        borderColor="#451c44"
                        shadowColor="black"
                        className="w-full lg:w-[65vw] sm:w-[50vw] h-auto lg:h-[50vh] flex flex-col p-4">
                        {questions.length > 0 ? (
                            questions.map((q) => (
                                <div key={q.question_id} className="flex flex-col items-center">
                                    <svg viewBox="0 0 350 100" xmlns="http://www.w3.org/2000/svg" className="w-[100%] h-[30%]">
                                        <text
                                            x="50%"
                                            y="50%"
                                            dominantBaseline="middle"
                                            textAnchor="middle"
                                            fill="#e2b3cc"
                                            stroke="#4a1237"
                                            strokeWidth="7"
                                            paintOrder="stroke fill"
                                            className="font-custom sm:text-[5vw] lg:text-[3vw] max-lg:text-[5vh] custom-shadow3"
                                        >
                                            QUESTION {q.question_id}
                                        </text>
                                    </svg>
                                    <p className="text-[3vw] sm:text-[2vw] lg:text-[2vw] text-center mt-2">{q.text}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">Loading question...</p>
                        )}
                    </Card>
                </div>

                {/* Right Side: Score & Lifelines (Stacked) */}
                <div className="flex flex-col lg:w-[17vw] lg:ml-5 sm:ml-0 ">
                    {/* Score Card */}
                    <div>
                        <Card
                            bg="#393867"
                            textColor="#e2b3cc"
                            borderColor="#451c44"
                            shadowColor="black"
                            className="score w-full lg:w-[17vw] h-[8vh] flex lg:mt-[110px] justify-center items-center shadow-black font-custom">
                            <svg viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <text
                                    x="50%"
                                    y="50%"
                                    dominantBaseline="middle"
                                    textAnchor="middle"
                                    fill="#e2b3cc"
                                    stroke="#4a1237"
                                    strokeWidth="11"
                                    paintOrder="stroke fill"
                                    className="custom-shadow3 font-normal text-[4vw] lg:text-[4vw]">
                                    SCORE: {score}
                                </text>
                            </svg>
                        </Card>
                    </div>

                    {/* Lifeline Card */}
                    <div className=" lg:mt-5">
                        <Lifelines />
                    </div>
                </div>
            </div>

            {/* Inputs & Submit Section */}
            <div className="w-full flex flex-col lg:flex-row items-center justify-start mt-5 lg:mt-10 gap-4">
                {questions?.length > 0 &&
                    questions.map((q) => (
                        <div key={q.question_id} className="flex flex-col lg:flex-row gap-9 w-full max-w-[90%] lg:max-w-[100%]">
                            {/* Input 1 */}
                            <Input
                                type="text"
                                bg="#393867"
                                textColor="#e2b3cc"
                                borderColor="#451c44"
                                shadowColor="black"
                                className="w-full lg:w-[37%] h-[7.5vh] font-custom text-center"
                                placeholder="INPUT 1"
                                value={answer.input1}
                                onChange={(e) => setAnswer({ ...answer, input1: e.target.value })}
                                disabled={input1Disabled}
                            />

                            {/* Input 2 */}
                            <Input
                                type="text"
                                bg="#393867"
                                textColor="#e2b3cc"
                                borderColor="#451c44"
                                shadowColor="black"
                                className="w-full lg:w-[37%] h-[7.5vh] font-custom text-center"
                                placeholder="INPUT 2"
                                value={answer.input2}
                                onChange={(e) => setAnswer({ ...answer, input2: e.target.value })}
                                disabled={input2Disabled}
                            />

                            {/* Submit Button */}
                            <Button
                                type="text"
                                bg="#ca5f93"
                                textColor="#e2b3cc"
                                borderColor="#451c44"
                                shadowColor="black"
                                className=" shadow-[#451c44]  w-full lg:w-[10vw] h-[7.5vh] flex justify-center"
                                onClick={() => handleSubmit(q.question_id, input1Disabled ? 2 : 1)}
                            >
                                <svg viewBox="0 0 400 170" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                    <text
                                        x="50%"
                                        y="50%"
                                        dominantBaseline="middle"
                                        textAnchor="middle"
                                        fill="#e2b3cc"
                                        stroke="#4a1237"
                                        strokeWidth="17"
                                        paintOrder="stroke fill"
                                        className="custom-shadow3 font-normal text-[7vw] lg:text-[4vw]">
                                        SUBMIT
                                    </text>
                                </svg>
                            </Button>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Rashmi_Question;
