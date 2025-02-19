import { Card } from "pixel-retroui";
import { Button, Popup } from "pixel-retroui";
import React, { useState } from "react";

function InfoCard(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <Card
      className="card"
      borderColor="#48173d"
      shadowColor="#48173d"
      bg="#393867"
    >
      <img
        placeholder="lifeline image"
        className="lifeline-img"
        src={props.img}
      />
      {/* <div className="lifeline-name">Lifeline {props.number}</div> */}
      <div className="lifeline-desc">{props.desc}</div>
      <Button
        className="more-info"
        onClick={openPopup}
        bg="#ca5f93"
        shadow="#ca5f93"
      >
        More Info
      </Button>
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        className="popup"
        bg="#393867"
        borderColor="#393867"
        baseBg="#393867"
      >
        <div className="popup-title-container">
          <img placeholder="icon" src={props.img} className="popup-icon" />
          <p className="lifeline-name">{props.title}</p>
        </div>
        <div className="more-info-desc">
          <p>{props.more}</p>
        </div>
        <div>
          <Button
            onClick={closePopup}
            bg="#ca5f93"
            borderColor="#1e3445"
            shadowColor="#1e3445"
          >
            CLOSE
          </Button>
        </div>
      </Popup>
    </Card>
  );
}

export default InfoCard;