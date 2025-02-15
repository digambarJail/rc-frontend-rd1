import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Outlet } from "react-router-dom";
import { Trophy, Medal, Target } from 'lucide-react';
// import goldmedal from "../assets/gold.png";
// import silvermedal from "../assets/silver.png";
// import bronzemedal from "../assets/bronze.png";
import { Card } from 'pixel-retroui';
import './LeaderboardStyles.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([
    { username: "Alice", accuracy: "95", questionsSolved: "150" },
    { username: "Bob", accuracy: "90", questionsSolved: "140" },
    { username: "Charlie", accuracy: "85", questionsSolved: "130" },
  ]);
  const [userRank, setUserRank] = useState("4");
  const [allUsers, setAllUsers] = useState([
    { rank: 1, username: "Alice", questionsSolved: "150", accuracy: "95" },
    { rank: 2, username: "Bob", questionsSolved: "140", accuracy: "90" },
    { rank: 3, username: "Charlie", questionsSolved: "130", accuracy: "85" },
    { rank: 4, username: "David", questionsSolved: "120", accuracy: "80" },
    { rank: 5, username: "Eve", questionsSolved: "110", accuracy: "75" },
  ]);

  const columns = [
    { 
      field: "rank", 
      headerName: "Rank", 
      width: 70,
      flex: 0.5,
      renderCell: (params) => (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          color: '#FFDAB3',
          fontWeight: 'bold',
          fontSize: 'clamp(0.8rem, 2vw, 1.1rem)'
        }}>
          <Medal size={16} />
          {params.value}
        </div>
      )
    },
    { 
      field: "username", 
      headerName: "Username", 
      width: 130,
      flex: 1,
      renderCell: (params) => (
        <div style={{ 
          color: '#FFD1E8',
          fontWeight: 'bold',
          fontSize: 'clamp(0.8rem, 2vw, 1.1rem)'
        }}>
          {params.value}
        </div>
      )
    },
    { 
      field: "questionsSolved", 
      headerName: "Questions", 
      width: 100,
      flex: 1,
      renderCell: (params) => (
        <div style={{ 
          color: '#FFDAB3',
          fontWeight: 'bold',
          fontSize: 'clamp(0.8rem, 2vw, 1.1rem)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Target size={16} />
          {params.value}
        </div>
      )
    },
    { 
      field: "accuracy", 
      headerName: "Accuracy", 
      width: 90,
      flex: 0.8,
      renderCell: (params) => (
        <div style={{ 
          color: '#FFDAB3',
          fontWeight: 'bold',
          fontSize: 'clamp(0.8rem, 2vw, 1.1rem)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Trophy size={16} />
          {params.value}%
        </div>
      )
    },
  ];

  return (
    <div className="page-container">
      <div className="container">
        <div className="header-section">
          <Trophy size={32} className="header-icon" />
          <h1 className="header-title">Leaderboard</h1>
        </div>
        <div className="leaderboard-grid">
          <div className="top-cards">
            {leaderboard.map((user, index) => (
              <Card
                key={index}
                bg="#44437B"
                textColor="#FFD1E8"
                borderColor="#4A1237"
                shadowColor="#1E3445"
                className={`card${index + 1}`}
              >
                <div className="medal-container">
                  {/* {index === 0 && <img src={goldmedal} className="medal goldmedal" alt="Gold Medal" />}
                  {index === 1 && <img src={silvermedal} className="medal silvermedal" alt="Silver Medal" />}
                  {index === 2 && <img src={bronzemedal} className="medal bronzemedal" alt="Bronze Medal" />} */}
                </div>
                <div className="allcards" >
                <div className="card-content">
                  <div className="username"><p>{user.username}</p></div>
                  <div className="stats-container">
                    <div className="stat-group">
                      <div className="stat-icon"><Target size={20} /></div>
                      <div className="questions-solved-text"><p>Questions Solved</p></div>
                      <div className="number-of-questions"><p>{user.questionsSolved}</p></div>
                    </div>
                    <div className="stat-group">
                      <div className="stat-icon"><Trophy size={20} /></div>
                      <div className="Accuracy-text"><p>Accuracy</p></div>
                      <div className="Accuracy-pct"><p>{user.accuracy}%</p></div>
                    </div>
                  </div>
                </div>
                </div>
              </Card>
            ))}
          </div>

          <Card 
            className="card4"
            bg="#44437B"
            textColor="#FFD1E8"
            borderColor="#4A1237"
            shadowColor="#1E3445"
          >
            <div className="attempted-ques">
              <div className="attempted-ques-content">
                <Medal size={24} className="rank-icon" />
                <div className="attempted-ques-text"><p>YOUR RANK</p></div>
              </div>
              <div className="attempted-ques-num"><p>{userRank}</p></div>
            </div>
            <div className="datagrid-container">
              <DataGrid 
                rows={allUsers} 
                columns={columns} 
                getRowId={(row) => row.rank}
                disableRowSelectionOnClick
                autoHeight
                sx={{
                  border: 'none',
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#CA5F93',
                    color: '#FFD1E8',
                    fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                    fontWeight: 'bold',
                    borderBottom: '2px solid #4A1237',
                  },
                  '& .MuiDataGrid-row': {
                    cursor: 'pointer',
                    backgroundColor: 'rgba(68, 67, 123, 0.5)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(202, 95, 147, 0.3)',
                      transform: 'translateX(4px)',
                    },
                  },
                  '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid rgba(202, 95, 147, 0.3)',
                    padding: '12px 16px',
                  },
                  '@media (max-width: 600px)': {
                    '& .MuiDataGrid-columnHeaders': {
                      fontSize: '0.9rem',
                    },
                  },
                }}
              />
            </div>
          </Card>
        </div>
      </div>
      {/* <Outlet /> */}
    </div>
  );
};

export default Leaderboard;