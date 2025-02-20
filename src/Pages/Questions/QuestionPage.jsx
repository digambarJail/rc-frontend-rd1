import React, { useState, useEffect } from "react";
import { Card, Input, Button } from "pixel-retroui";
// import 'pixel-retroui/dist/index.css';
import "./QuestionStyles.css";
// import Lifelines from '../../components/Lifelines/Lifelines';
import Cookies from "js-cookie";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Questionpage() {
  const [questions, setQuestion] = useState({
    question_id: 0,
    is_junior: "",
    question_text: "",
  });

  const [lifeLines, setLifeLines] = useState({
    doubleStatus: null,
    freezeStatus: null,
    skipStatus: null,
  });
  // const [answer, setAnswer] = useState({ input1: "", input2: "" });
  const [answer, setAnswer] = useState();
  const [input1Disabled, setInput1Disabled] = useState(false);
  const [input2Disabled, setInput2Disabled] = useState(true);
  const [score, setScore] = useState(0); // Track the score
  const [streak, setStreak] = useState(0); // Track the streak

  const [timeLeft, setTimeLeft] = useState(null); // Track time left for the timer

  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);

  // const initialTime = Math.floor((apiResponse?.remainingTimeInMilliseconds || 0) / 1000);

  // Placeholder for user ID (you can fetch this from your backend or pass it as a prop)
  // const currentUserId = "example-user-id"; // Replace this with the actual user ID

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = Cookies.get("jwt"); // Retrieve the token from cookies

        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/start`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        console.log("HERREEEEE",res.data);

        // setQuestion([res.data.question.question_id, res.data.question.is_junior, res.data.question.question_text]);
        setQuestion({
          question_id: res.data.question.question_id,
          is_junior: res.data.question.is_junior,
          question_text: res.data.question.question_text,
        });
        setCounter(res.data.counter + 1);


        setLifeLines({
          doubleStatus: res.data.doubleStatus,
          freezeStatus: res.data.freezeStatus,
          skipStatus: res.data.skipStatus,
        });
        const initialTimeInSeconds = Math.floor(res.data.timeLeft / 1000);
        setTimeLeft(initialTimeInSeconds);
        setScore(res.data.marks);
        setStreak(res.data.streak);


        console.log("Initial Marks: ", score);
        console.log("Initial LIFELINES: ", lifeLines);

        toast.info("New Question Loaded!", { position: "top-right", autoClose: 2000 });

        // console.log("TIMEEEE",initialTimeInSeconds);
      } catch (error) {
        toast.error("Failed to load the question!", { position: "top-right", autoClose: 3000 });
        console.error("Error fetching the question", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft === null) return; // Don't start timer until timeLeft is set

    // console.log("TIME LEFT:", timeLeft);

    if (timeLeft <= 0) {
      // alert("TEST ENDED !!!");
      toast.error("Time is up! Redirecting to results...", { position: "top-center", autoClose: 2000 });
      navigate('/result')
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [timeLeft]); // Runs whenever `timeLeft` updates

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLifeline, setSelectedLifeline] = useState(null);

  // Lifelines array
  const lifelines = [
    {
      id: "1",
      title: "Skip Question",
      description: "Skip the current question without losing points.",
      type: "skip-lifeline",
      status: lifeLines.skipStatus,
    },
    {
      id: "2",
      title: "Double Answer",
      description: "Get two attempts at the answer.",
      type: "double-lifeline",
      status: lifeLines.doubleStatus,
    },
    {
      id: "3",
      title: "Increase Timer",
      description: "Pause the timer for an additional 2 minutes.",
      type: "increase-timer-lifeline",
      status: lifeLines.freezeStatus,
    },
  ];

  const handleLifelineUse = async (lifelineType, currentQuestionId, answer) => {
    

    const token = Cookies.get("jwt");

    if (lifelineType == "increase-timer-lifeline") {
      try{
        const res1 = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/${lifelineType}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        console.log(res1.data);
        const newTimeLeft = Math.floor(res1.data.timeLeft / 1000); // Convert milliseconds to seconds
        setTimeLeft(newTimeLeft);
        setStreak(res1.data.streak);
  
        setLifeLines({
          doubleStatus: res1.data.doubleStatus,
          freezeStatus: res1.data.freezeStatus,
          skipStatus: res1.data.skipStatus,
        });
        toast.success("Timer increased successfully!", { position: "top-right", autoClose: 2000 });
      }
      catch (error) {
        toast.error("Failed to increase timer!", { position: "top-right", autoClose: 3000 });
      }

    }

    if (lifelineType == "skip-lifeline") {
      try{
        const res2 = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/${lifelineType}`,
          { currentQuestionId },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        console.log(res2.data);
        setQuestion({
          question_id: res2.data.nextQuestion.question_id,
          is_junior: res2.data.nextQuestion.is_junior,
          question_text: res2.data.nextQuestion.question_text,
        });
        const newTimeLeft = Math.floor(res2.data.timeLeft / 1000); // Convert milliseconds to seconds
        setTimeLeft(newTimeLeft);
        setStreak(res2.data.streak);
  
  
        setLifeLines({
          doubleStatus: res2.data.doubleStatus,
          freezeStatus: res2.data.freezeStatus,
          skipStatus: res2.data.skipStatus,
        });
        setScore(res2.data.marks);
        toast.success("Question skipped successfully!", { position: "top-right", autoClose: 2000 });
      }
      catch (error) {
        toast.error("Failed to skip question!", { position: "top-right", autoClose: 3000 });
      }
    }

    if (lifelineType == "double-lifeline") {
      if (!answer || answer.trim() === "") {
        // alert("PROVIDE VALID INPUT");
        toast.warning("Please provide a valid input!", { position: "top-center", autoClose: 2000 });
      } else {
        const token = Cookies.get("jwt"); // Retrieve the token from cookies
        let processedAnswer = answer.toLowerCase();

        // Remove ALL spaces using a global regex
        processedAnswer = processedAnswer.replace(/\s+/g, "");
        console.log("PROCESSED ANSWER: ", processedAnswer);
        if (!processedAnswer || processedAnswer == "") {
          // alert("PROVIDE VALID INPUT");
          toast.warning("Please provide a valid input!", { position: "top-center", autoClose: 2000 });
        } else {
        
          try{
            const res3 = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/api/${lifelineType}`,
              { answer:processedAnswer, currentQuestionId },
              {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              }
            );
            console.log(res3.data);
            setQuestion({
              question_id: res3.data.question.question_id,
              is_junior: res3.data.question.is_junior,
              question_text: res3.data.question.question_text,
            });
            const newTimeLeft = Math.floor(res3.data.timeLeft / 1000); // Convert milliseconds to seconds
            setTimeLeft(newTimeLeft);
            setStreak(res3.data.streak);
            toast.success(res3.data.message, { position: "top-center", autoClose: 2000 });
      
            // alert(res3.data.message);
            setLifeLines({
              doubleStatus: res3.data.doubleStatus,
              freezeStatus: res3.data.freezeStatus,
              skipStatus: res3.data.skipStatus,
            });
            setScore(res3.data.marks);
          }
          catch (error) {
            toast.error("Failed to use double lifeline!", { position: "top-right", autoClose: 3000 });
          }

        }
      }
    }
  };

  const [attemptCount, setAttemptCount] = useState(1);

  const handleSubmit = async (answer, currentQuestionId) => {
    try {
        console.log("ANSWERRR ",answer )
      if (!answer || answer.trim() === "") {
        toast.warning("Please provide a valid answer!", { position: "top-center", autoClose: 2000 });
        // alert("PROVIDE VALID INPUT");
        return;
      } else {
        const token = Cookies.get("jwt"); // Retrieve the token from cookies
        let processedAnswer = answer.toUpperCase();

        // Remove ALL spaces using a global regex
        processedAnswer = processedAnswer.replace(/\s+/g, "");
        console.log("PROCESSED ANSWER: ", processedAnswer);
        if (!processedAnswer || processedAnswer == "") {
          // alert("PROVIDE VALID INPUT");
          toast.warning("Please provide a valid answer!", { position: "top-center", autoClose: 2000 });
          return;
        } else {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/next`,
            { answer: processedAnswer, currentQuestionId }, // Ensure question_id is sent correctly
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
          if(res.data.question === null){
            toast.success(res.data.message, { position: "top-center", autoClose: 2000 })
            // alert(res.data.message);
            const respo = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/submit`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                  withCredentials: true,
                }
              );
            if(respo.status == 200){
                navigate('/result');
            }

          }
          toast.info(res.data.message, { position: "top-right", autoClose: 2000 });
          console.log("NEXT Response:", res.data);
          const newTimeLeft = Math.floor(res.data.timeLeft / 1000); // Convert milliseconds to seconds
          setTimeLeft(newTimeLeft);

          setCounter(res.data.counter+1);

          // if(res.data.message === "Correct Answer!"){
          setQuestion({
            question_id: res.data.question.question_id,
            is_junior: res.data.question.is_junior,
            question_text: res.data.question.question_text,
          });
          setScore(res.data.marks);
        setStreak(res.data.streak);

          setLifeLines({
            doubleStatus: res.data.doubleStatus,
            freezeStatus: res.data.freezeStatus,
            skipStatus: res.data.skipStatus,
          });
          setAnswer();
          console.log("TIME IN FRONTEND: ", timeLeft);
          console.log("ANSWER IN FRONTEND: ", answer);

        }
      }
    } catch (error) {
      toast.error("Submission failed! Try again.", { position: "top-center", autoClose: 3000 });
      console.error(
        "Error submitting answer: ",
        error.response?.data || error.message
      );
    }
  };

  //   const lifelinesState(() => {

  //   })

  return (
    <>
      {/* <FullScreenEnforcer /> */}

      <div className="flex flex-col lg:flex-row w-full mt-5 ml-0 p-0 justify-evenly items-center lg:items-center">
        {/* Left Side: Question Card */}
        <div className="w-full lg:w-[60vw] bg--300 flex flex-col justify-center mt-8 sm:mt-16 lg:mt-8">
          <h2 className="text-[32px] text-white">
            Time Remaining: {formatTime(timeLeft)}
          </h2>

          <Card
            bg="#393867"
            textColor="#e2b3cc"
            borderColor="#451c44"
            shadowColor="black"
            className="w-full lg:w-[100%] sm:w-[50vw] h-auto lg:h-[50vh] flex flex-col p-4"
          >
            {questions ? (
              // questions.map((q) => (
              <div
                key={questions.question_id}
                className="flex flex-col justify-start items-center"
              >
                <svg
                  viewBox="0 0 350 100"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[100%] h-[16%]"
                >
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="#e2b3cc"
                    stroke="#4a1237"
                    strokeWidth="5"
                    paintOrder="stroke fill"
                    className="font-custom lg:text-[32px]  custom-shadow3"
                  >
                    QUESTION {counter}
                  </text>
                </svg>
                <div className="scroll-div h-[50%] w-full bg--900 overflow-y-auto flex justify-start items-start">
                <p className="text-[3vw] sm:text-[2vw] lg:text-[24px] text-center mt-2 text-start ">
                  {questions.question_text}
                </p>
                </div>
              </div>
            ) : (
              // ))
              <p className="text-center">Loading question...</p>
            )}
          </Card>
        </div>

        {/* Right Side: Score & Lifelines (Stacked) */}
        <div className="flex flex-col lg:w-[30vw] lg:ml-5 sm:ml-0 ">
          {/* Score Card */}
          <div className="w-full h-auto bg--500" >
            <Card
              bg="#393867"
              textColor="#e2b3cc"
              borderColor="#451c44"
              shadowColor="black"
              className="score w-full lg:w-[80%] h-[50px] flex  justify-center items-center shadow-black font-custom"
            >
              <svg
                viewBox="0 0 500 100"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="#e2b3cc"
                  stroke="#4a1237"
                  strokeWidth="11"
                  paintOrder="stroke fill"
                  className="custom-shadow3 font-normal text-[3vw] lg:text-[4vw]"
                >
                  SCORE: {score}
                </text>
              </svg>
            </Card>
            <Card
              bg="#393867"
              textColor="#e2b3cc"
              borderColor="#451c44"
              shadowColor="black"
              className="score w-full lg:w-[80%] h-[50px] flex lg:mt-[20px] justify-center items-center shadow-black font-custom"
            >
              <svg
                viewBox="0 0 500 100"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="#e2b3cc"
                  stroke="#4a1237"
                  strokeWidth="11"
                  paintOrder="stroke fill"
                  className="custom-shadow3 font-normal text-[4vw] lg:text-[4vw]"
                >
                  STREAK: {streak}
                </text>
              </svg>
            </Card>
          </div>

          {/* Lifeline Card */}
          <div className=" bg--400 lg:mt-5 bg--500 w-[100%] ">
            <div>
              <Card
                bg="#393867"
                textColor="#e2b3cc"
                borderColor="#451c44"
                shadowColor="black"
                className="score w-full lg:w-[80%] lg:h-[37vh] sm:h-[30vh] flex-col justify-center items-center shadow-black font-custom"
              >
                <svg
                  viewBox="0 0 500 100"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto"
                >
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="#e2b3cc"
                    stroke="#4a1237"
                    strokeWidth="10"
                    paintOrder="stroke fill"
                    className="custom-shadow3 font-normal lg:text-[32px] max-lg:text-[2vh]"
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
                      className="w-[90%] h-[40px] flex items-center px-2 py-[4px] shadow-[#c381b5]"
                    >
                      <svg
                        viewBox="0 0 500 100"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto"
                      >
                        <text
                          x="1%"
                          y="50%"
                          dominantBaseline="middle"
                          fill="#e2b3cc"
                          stroke="#4a1237"
                          strokeWidth="10"
                          paintOrder="stroke fill"
                          className="custom-shadow3 font-normal lg:text-[40px] max-lg:text-[2vh]"
                        >
                          {lifeline.title}
                        </text>
                      </svg>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedLifeline(lifeline);
                            setIsOpen(true);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className="text-[#4a0f35] text-lg"
                          />
                        </button>
                        <button
                          onClick={() =>
                            handleLifelineUse(
                              lifeline.type,
                              questions.question_id,
                              answer
                            )
                          }
                          disabled={
                            lifeline.status == null || lifeline.status == true
                          }
                          className={`text-[#4a0f35] text-lg ${
                            lifeline.status == null || lifeline.status == true
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
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
                    <h2
                      className="text-2xl font-bold mb-2"
                      style={{
                        color: "#e2b3cc",
                        fontSize: "35px",
                        marginTop: "50px",
                      }}
                    >
                      {selectedLifeline.title}
                    </h2>
                    <br />
                    <p
                      className="mb-4"
                      style={{ color: "#e2b3cc", fontSize: "15px" }}
                    >
                      {selectedLifeline.description}
                    </p>
                    <button
                      className="absolute text-white text-lg"
                      style={{
                        fontFamily: "MyCustomFont",
                        right: "10px",
                        top: "10px",
                        color: "#e2b3cc",
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      ✖
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* <Lifelines /> */}
          </div>
        </div>
      </div>

      {/* Inputs & Submit Section */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-center  gap-4 bg--500">
        {
          questions && (
            // questions.slice(0,1).map((q) => (
            <div
              key={questions.question_id}
              className="flex flex-col lg:flex-row gap-9 max-w-[90%] lg:max-w-[100%]"
            >
              {/* Input 1 */}
              <Input
                type="text"
                bg="#393867"
                textColor="#e2b3cc"
                borderColor="#451c44"
                shadowColor="black"
                className="w-full lg:w-[400px] h-[60px] font-custom text-center flex justify-center items-center"
                placeholder="INPUT"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={input1Disabled}
              />

              {/* Input 2 */}
              {/* <Input
                                type="text"
                                bg="#393867"
                                textColor="#e2b3cc"
                                borderColor="#451c44"
                                shadowColor="black"
                                className="w-full lg:w-[37%] h-[7.5vh] font-custom text-center"
                                placeholder="INPUT 2"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value )}
                                disabled={input2Disabled}
                            /> */}

              {/* Submit Button */}
              <Button
                type="text"
                bg="#ca5f93"
                textColor="#e2b3cc"
                borderColor="#451c44"
                shadowColor="black"
                className=" shadow-[#451c44] lg:w-[10vw] h-[50px] flex justify-center"
                onClick={() => handleSubmit(answer, questions.question_id)}
              >
                <svg
                  viewBox="0 0 400 170"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="#e2b3cc"
                    stroke="#4a1237"
                    strokeWidth="17"
                    paintOrder="stroke fill"
                    className="custom-shadow3 font-normal text-[7vw] lg:text-[4vw]"
                  >
                    SUBMIT
                  </text>
                </svg>
              </Button>
            </div>
          )
          // ))
        }
      </div>
      <ToastContainer />
    </>
  );
}

export default Questionpage;
