import React, { useState } from "react";
import randomImage from "../../images/randomImage.png";
import "./NewsCard.css";

function NewsCard() {
  const [isButtonClick, setIsButtonClick] = useState(false);
  let isCardSaved = false;
  function handleButtonClick() {
    setIsButtonClick(true);
  }

  return (
    <li className="card">
      <img className="card__image" src={randomImage} alt="Красивая картинка" />
      <p className="card__tag">Природа</p>
      <p className="card__date">2 августа, 2019</p>
      <h2 className="card__title">Национальное достояние – парки</h2>
      <p className="card__text">
        В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала
        складываться система национальных парков – охраняемых территорий, где и
        сегодня каждый может приобщиться к природе.
      </p>
      <p className="card__source">Дзен</p>
      <button
        className={
          "card__button" +
          (isCardSaved ? " card__button_delete" : " card__button_save")
        }
        onClick={handleButtonClick}
      ></button>
      {isButtonClick && (
        <p className="card__button-label">Войдите, чтобы сохранять статьи</p>
      )}
    </li>
  );
}

export default NewsCard;
