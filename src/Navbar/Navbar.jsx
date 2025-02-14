import React from 'react';
import { Button } from 'pixel-retroui';
import 'pixel-retroui/dist/index.css';
import './Navbar.css';

const Navbar = () => {
  return (
    <>
      <div className='navbar' >
        <div className="navbar-left">
          <h3 className='rc'>RC</h3>
        </div>
      
        <div className="navbar-right">
          <a className="leaderboard" href="">LEADERBOARD</a>
          <a className="result" href="">RESULT</a>
          <a className="logout-text" href="">
            <Button 
                bg="#CA5F93"
                textColor="#FFDAB3"
                borderColor="#4a1237"
                shadowColor="#1E3445"
                className="logoutbtn"
            >
                LOGOUT
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;