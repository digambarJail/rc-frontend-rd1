import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from 'pixel-retroui';
import './QuestionStyles.css';
// import Lifelines from './Lifelines/Lifelines';

function QuestionPage() {

    const [question, setQuestion] = useState([]); // Store question as an array
    const [answer, setAnswer] = useState({ input1: "", input2: "" });
    const [input1Disabled, setInput1Disabled] = useState(false);
    const [input2Disabled, setInput2Disabled] = useState(true);
    const [responseMessage, setResponseMessage] = useState("");
    const [score, setScore] = useState(0); // Track the score

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/question");
            const data = await res.json();
            setQuestion([data.question]); // Wrap the single question in an array
            setAnswer({ input1: "", input2: "" }); // Clear inputs
        } catch (error) {
            console.error("Error fetching the question", error);
        }
    };

    const handleSubmit = async (id, attempt) => {
        try {
            const res = await fetch("http://localhost:5000/api/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: id,
                    answer: attempt === 1 ? answer.input1 : answer.input2
                }),
            });

            const data = await res.json();

            if (data.correct) {
                setScore(prevScore => prevScore + 1); // Increase score on correct answer
                setAnswer({ input1: "", input2: "" });
                setInput1Disabled(false);
                setInput2Disabled(true);
                fetchQuestions();
            } else {
                if (attempt === 1) {
                    setInput1Disabled(true);
                    setInput2Disabled(false);
                } else {
                    setScore(prevScore => prevScore - 1); // Decrease score on second incorrect attempt
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

            <div style={{ display: 'flex', marginTop: '0', flexWrap: 'wrap', overflow: 'hidden' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',  // Align cards side by side
                        flexWrap: 'wrap',  // Allow wrapping if necessary
                        width: '100%',
                        marginTop: '0%',
                        marginLeft: '0%',
                        className: 'container'

                    }}
                >
                    <div style={{ flex: 1, }}>

                        <Card
                            bg="#393867"
                            textColor="#e2b3cc"
                            borderColor="#451c44"
                            shadowColor="black"
                            className="w-[65vw] h-[50vh] flex "
                            id="question"
                        >
                            {question.length > 0 ? (
                                question.map((q) => (

                                    <svg
                                        viewBox="0 0 350 100"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-[25vw] h-[10vh]"
                                        key={q.id}

                                    >
                                        <text

                                            x="6vw"
                                            y="10vh"
                                            dominantBaseline="middle"
                                            textAnchor="middle"
                                            fill="#e2b3cc"
                                            stroke="#4a1237"
                                            strokeWidth="4"
                                            paintOrder="stroke fill"
                                            style={{ fontFamily: "MyCustomFont", fontSize: '4.5vw' }}
                                            className="custom-shadow3 font-normal lg:text-[1vw] max-lg:text-[5vh]"
                                        >
                                            QUESTION {q.id}
                                        </text>
                                    </svg>
                                ))
                            ) : (
                                <p>?</p>
                            )}

                            <div
                                xmlns="http://www.w3.org/1999/xhtml"
                                style={{
                                    color: '#e2b3cc',
                                    fontSize: '10px',
                                    lineHeight: '1',
                                    textAlign: 'justify',
                                   
                                }}
                            >
                                {question.length > 0 ? (
                                    question.map((q) => (
                                        <p key={q.id}

                                            style={{
                                                marginBottom: '8px', position: 'absolute',
                                                left: '125px', fontSize: '30px'
                                            }}>
                                            <svg>
                                                <foreignObject
                                                    x="1.8vw"
                                                    y="13vh"
                                                    width="92%"
                                                    height="70%"

                                                >
                                                    {q.text}
                                                </foreignObject>
                                            </svg>
                                        </p>
                                    ))
                                ) : (
                                    <p>Loading question...</p>
                                )}
                            </div>
                        </Card>
                    </div>

                    <div style={{ flex: 1, paddingLeft: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Card
                                bg="#393867"
                                textColor="#e2b3cc"
                                borderColor="#451c44"
                                shadowColor="black"
                                className="score w-[17vw] h-[8.5vh] flex items-center mb-4"
                                
                            >
                                <svg
                                    viewBox="0 0 500 100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-full h-full"
                                >
                                    <text
                                        x="40%"
                                        y="50%"
                                        dominantBaseline="middle"
                                        textAnchor="middle"
                                        fill="#e2b3cc"
                                        stroke="#4a1237"
                                        strokeWidth="11"
                                        paintOrder="stroke fill"
                                        style={{ fontFamily: "MyCustomFont", fontSize: '130px' }}
                                        className="custom-shadow3 font-normal lg:text-[3.5vw] max-lg:text-[2vh]"
                                    >
                                        SCORE
                                    </text>
                                </svg>

                                <svg
                                    viewBox="0 0 500 100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-full h-full"
                                >
                                    <text
                                        x="77%"
                                        y="50%"
                                        dominantBaseline="middle"
                                        textAnchor="middle"
                                        fill="#e2b3cc"
                                        stroke="#4a1237"
                                        strokeWidth="11"
                                        paintOrder="stroke fill"
                                        style={{ fontFamily: "MyCustomFont", fontSize: '130px' }}
                                        className="custom-shadow3 font-normal lg:text-[3.5vw] max-lg:text-[2vh]"
                                    >
                                        {score}
                                    </text>
                                </svg>
                            </Card>

                            {/* <Lifelines /> */}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        gap: '20px',
                        width: '100%',
                        marginLeft: '2.5%',
                        marginTop: '20px',
                        alignItems: 'center'  // Ensure the inputs and buttons align properly
                    }}
                >
                    {question?.length > 0 &&
                        question.map((q) => (
                            <div key={q.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        position: 'absolute',
                                        left: '7.5vw',
                                        gap: '20px',
                                        width: '100%',
                                        marginBottom: '10px',


                                    }}
                                >
                                    <Input
                                        type='text'
                                        bg="#393867"
                                        textColor="#e2b3cc"
                                        borderColor="#975183"
                                        placeholder="INPUT 1"
                                        className='input-container'
                                        style={{

                                            width: "31.5vw",
                                            height: "7.5vh",
                                            
                                        }}
                                        value={answer.input1}
                                        onChange={(e) => setAnswer({ ...answer, input1: e.target.value })}
                                        disabled={input1Disabled}
                                    />

                                    <Input
                                        bg="#393867"
                                        textColor="#e2b3cc"
                                        borderColor="#975183"
                                        placeholder="INPUT 2"
                                        className='input-container'
                                        style={{

                                            width: "31.5vw",
                                            height: "7.5vh",
                                            
                                        }}
                                        value={answer.input2}
                                        onChange={(e) => setAnswer({ ...answer, input2: e.target.value })}
                                        disabled={input2Disabled}
                                    />
                                </div>

                                <Button
                                    bg="#ca5f93"
                                    textColor="#e2b3cc"
                                    borderColor="#232f43"
                                    shadowColor="#451c44"
                                    className=" submit-btn w-[9vw] h-[6.5vh] flex justify-center "
                                    onClick={() => handleSubmit(q.id, input1Disabled ? 2 : 1)}
                                    style={{ marginTop: "6vh", position: 'absolute', left: '82.5vw' }}
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
                                            style={{
                                                
                                                textDecoration: 'none',
                                            }}
                                            className="custom-shadow3 font-normal lg:text-[7vw] max-lg:text-[5vh]"
                                        >
                                            SUBMIT
                                        </text>
                                    </svg>
                                </Button>
                            </div>
                        ))}
                    {responseMessage && <p className='mt-4 text-lg'>{responseMessage}</p>}
                </div>


            </div>
        </>
    )
}

export default QuestionPage;