import React from "react";
import "./contacts.scss";
import telegramIcon from "../../../../svg/social/telegram.svg";
import githubIcon from "../../../../svg/social/github.svg";

const Contacts = () => {
  return (
    <div className="contacts">
      <div className="contacts__item">
        <img className="contacts__item__icon" src={telegramIcon} alt="" />
        <div className="contacts__item__text">+7 (911) 878-03-02</div>
      </div>
      <div className="contacts__item">
        <img className="contacts__item__icon" src={githubIcon} alt="" />
        <div className="contacts__item__text">ditras228</div>
      </div>
    </div>
  );
};

export default Contacts;
