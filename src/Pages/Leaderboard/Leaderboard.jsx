import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Outlet } from "react-router-dom";
import { Trophy, Medal, Target } from "lucide-react";
import { Button, Card } from "pixel-retroui";
import "./LeaderBoard.css";
import axios from "axios";
import DataGridDemo from "../../components/Table/DataGridDemo.jsx";
import Cookies from "js-cookie";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]); 
  const [category, setCategory] = useState("junior"); // Junior or Senior leaderboard
  const [searchQuery, setSearchQuery] = useState("");
  const [userRank, setUserRank] = useState(null); 

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const token = Cookies.get("jwt");
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        // console.log("LEADERBOARD DATA:", res.data);
        if(res.data.currentUser == null){
            setUserRank()
        }
        else if(res.data.currentUser.is_junior){

          setUserRank(res.data.juniorRank);
        }
        else{
          setUserRank(res.data.seniorRank);

        }


        const formatTime = (seconds) => {
          const totalSeconds = Math.floor(seconds); // Ensure only integer seconds
          const minutes = Math.floor(totalSeconds / 60);
          const secs = totalSeconds % 60;
          return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        };
        


        const formatData = (data) =>
          data.map((player, index) => ({
            id: index + 1,
            rank: index + 1,
            username: player.username,
            marks: player.marks,
            timeTaken: formatTime(player.time_taken),
          }));

          

        setLeaderboardData({
          junior: formatData(res.data.juniorLeaderBoard),
          senior: formatData(res.data.seniorLeaderBoard),
        });

      } catch (err) {
        console.log("Error fetching leaderboard:", err.message);
      }
    };

    getLeaderboard();
  }, []);



  const selectedLeaderboard = leaderboardData[category] || [];

  // const filteredRows = leaderboardData.filter((row) =>
  //   row.username.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <>
      <div className="leaderboard-container">
        <h1 className="leaderboard-title">LEADERBOARD</h1>

        <div className="leaderboard-content">
          

          <div className="players-list h-[90%] bg--500">
            {
              userRank && <div className="your-rank">
              <span>YOUR RANK</span>
              <span className="rank-number">{userRank}</span>
            </div>
            }

            {/* Junior/Senior Toggle */}
        <div className="players-section w-full flex justify-center items-center">
          <Button
            bg={category === "junior" ? "#DE5027" : "#1a1b41"}
            textColor="white"
            borderColor="white"
            className="juniorButton px-[2vw] py-0"
            onClick={() => setCategory("junior")}
          >
            JUNIOR
          </Button>
          <Button
            bg={category === "senior" ? "#DE5027" : "#1a1b41"}
            textColor="white"
            borderColor="white"
            className="seniorButton px-[2vw] py-0"
            onClick={() => setCategory("senior")}
          >
            SENIOR
          </Button>
        </div>


            {/* Pass leaderboardData as a prop to DataGridDemo */}
            <DataGridDemo rows={selectedLeaderboard} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
