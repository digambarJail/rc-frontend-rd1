import { useEffect, useState } from "react";
import axios from "axios";
import catImage from "../../assets/cat.png";
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
          const response = await axios.get("import.meta.env.VITE_BASE_URL/api/submit",{withCredentials:true});
          console.log("response",reponse)
          const data = response.data;
          console.log("data",data)
          setUserData({
            username: data.currentUser,
            email: data.email,
            rank: data.rank, 
            score: data.score,
            attemptedQuestions: data.totalAttemptedQuestionCount,
            accuracy: data.accuracy,
            correctQuestions: data.correctQuestionCount,
            totalQuestions: data.totalQuestionCount,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUserData();
    }, []);
  
    return (
      <div className="container">
        <div className="headingresult">
          <h1>RESULT</h1>
        </div>
  
        <div className="result-main">
          <div className="left-card-section">
            <div className="left-top">
              <Card className="card1" 
              borderColor="#4a1237"
              bg="#44437B"
              textColor="black"
              shadowColor="#44437B"
              >
                <div className="catimg">
                  <img src={catImage} alt="Cat" />
                </div>
                <div className="card1-right">
                  <div className="user-info">
                    <p className="userName">
                      {userData.username || "POSIDON_33"}
                    </p>
                    <p className="Email">
                      {userData.email || "posidon@gmail.com"}
                    </p>
                  </div>
                  <a className="feedback-text" href="">
                    <Button
                      bg="#CA5F93"
                      textColor="#FFDAB3"
                      borderColor="#4a1237"
                      shadowColor="#CA5F93"
                      className="feedbackBtn"
                    >
                      FEEDBACK
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
  
            <div className="left-bottom">
              <Card className="card2" 
               borderColor="#4a1237"
               bg="#44437B"
               textColor="black"
               shadowColor="#44437B"
              >
                <div className="rank-info">
                  <p className="rank-num">{userData.rank || "33"}</p>
                  <p className="rank-text">RANK</p>
                </div>
              </Card>
  
              <Card className="card3" 
               borderColor="#4a1237"
               bg="#44437B"
               textColor="black"
               shadowColor="#44437B"
              >
                <div className="score-info">
                  <p className="score-num">{userData.score || "99"}</p>
                  <p className="score-text">SCORE</p>
                </div>
              </Card>
            </div>
          </div>
  
          <div className="right-card-section">
            <Card className="card4" 
             borderColor="#4a1237"
             bg="#44437B"
             textColor="black"
             shadowColor="#44437B"
            >
              <div className="right-card-top">
                <p className="stats-text">STATS</p>
              </div>
  
              <div className="right-card-bottom">
                <Card className="attempted-ques"
                borderColor="#4A1237"
                bg="#CA5F93"
                textColor="black"
                shadowColor="#CA5F93"
                >
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
                </Card>
  
                <Card className="accuracy"
                borderColor="#4A1237"
                bg="#CA5F93"
                textColor="black"
                shadowColor="#CA5F93"
                >
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
                </Card>
  
                <Card className="correct-ques"
                borderColor="#4A1237"
                bg="#CA5F93"
                textColor="black"
                shadowColor="#CA5F93"
                >
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
                </Card>
  
                <Card className="total-ques"
                borderColor="#4A1237"
                bg="#CA5F93"
                textColor="black"
                shadowColor="#CA5F93"
                >
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
                </Card>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  };
  
  export default ResultPage;
