import { useEffect, useState } from "react";
import axios from "axios";
// import catImage from "../assets/cat.png";
import { Card, Button } from 'pixel-retroui';
import './ResultStyles.css';

const ResultPage = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        rank: "",
        score: "",
        attemptedQuestions: "",
        accuracy: "",
        correctQuestions: "",
        totalQuestions: "",
    });

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await axios.get('API');
    //             const data = response.data;
    //             setUserData({
    //                 username: data.username,
    //                 email: data.email,
    //                 rank: data.rank,
    //                 score: data.score,
    //                 attemptedQuestions: data.attemptedQuestions,
    //                 accuracy: data.accuracy,
    //                 correctQuestions: data.correctQuestions,
    //                 totalQuestions: data.totalQuestions,
    //             });
    //         } catch (error) {
    //             console.error("Error fetching user data:", error);
    //         }
    //     };

    //     fetchUserData();
    // }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
                const data = response.data;
                setUserData({
                    username: data.username || "Default_User",
                    email: data.email || "default@example.com",
                    rank: "10",  // Placeholder as API doesn't provide rank
                    score: "85", // Placeholder as API doesn't provide score
                    attemptedQuestions: "25",
                    accuracy: "75%",
                    correctQuestions: "18",
                    totalQuestions: "30",
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);


    return (
        <div className="result-container">
            <div className="headingresult">
                <h1>RESULT</h1>
            </div>

            <div className="result-main">
                <div className="left-card-section">
                    <div className="left-top">
                        <Card className="card1" borderColor="#4a1237">
                            <div className="catimg">
                                {/* <img src={catImage} alt="Cat" /> */}
                            </div>
                            <div className="card1-right">
                                <div className="user-info">
                                    <p className="userName">{userData.username || "POSIDON_33"}</p>
                                    <p className="Email">{userData.email || "posidon@gmail.com"}</p>
                                </div>
                                <a className="feedback-text" href="">
                                    <Button
                                        bg="#CA5F93"
                                        textColor="#FFDAB3"
                                        borderColor="#4a1237"
                                        shadowColor="#1E3445"
                                        className="feedbackBtn"
                                    >
                                        FEEDBACK
                                    </Button>
                                </a>
                            </div>
                        </Card>
                    </div>

                    <div className="left-bottom">
                        <Card className="card2" borderColor="#4a1237">
                            <div className="rank-info">
                                <p className="rank-num">{userData.rank || "33"}</p>
                                <p className="rank-text">RANK</p>
                            </div>
                        </Card>

                        <Card className="card3" borderColor="#4a1237">
                            <div className="score-info">
                                <p className="score-num">{userData.score || "99"}</p>
                                <p className="score-text">SCORE</p>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="right-card-section">
                    <Card className="card4" borderColor="#4a1237">
                        <div className="right-card-top">
                            <p className="stats-text">STATS</p>
                        </div>

                        <div className="right-card-bottom">
                            <div className="attempted-ques">
                                <div className="attempted-ques-left">
                                    <div className="attempted-ques-text">
                                        <p>ATTEMPTED QUESTIONS</p>
                                    </div>
                                </div>
                                <div className="attempted-ques-right">
                                    <div className="attempted-ques-num">
                                        <p>{userData.attemptedQuestions || "20"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accuracy">
                                <div className="accuracy-left">
                                    <div className="accuracy-text">
                                        <p>ACCURACY</p>
                                    </div>
                                </div>
                                <div className="accuracy-right">
                                    <div className="accuracy-num">
                                        <p>{userData.accuracy || "50%"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="correct-ques">
                                <div className="correct-ques-left">
                                    <div className="correct-ques-text">
                                        <p>CORRECT QUESTIONS</p>
                                    </div>
                                </div>
                                <div className="correct-ques-right">
                                    <div className="correct-ques-num">
                                        <p>{userData.correctQuestions || "30"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="total-ques">
                                <div className="total-ques-left">
                                    <div className="total-ques-text">
                                        <p>TOTAL QUESTIONS</p>
                                    </div>
                                </div>
                                <div className="total-ques-right">
                                    <div className="total-ques-num">
                                        <p>{userData.totalQuestions || "50"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;