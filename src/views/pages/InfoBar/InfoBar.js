import React from 'react';

import onlineIcon from '../Icons/onlineIcon.png';
import closeIcon from '../Icons/closeIcon.png';

import { useNavigate } from "react-router-dom";

import './InfoBar.css';

const InfoBar = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <button style={{backgroundColor: "black"}} onClick={() => navigate("/join")}><img src={closeIcon} alt="close icon" /></button>
    </div>
  </div>
  )
  
  };

export default InfoBar;