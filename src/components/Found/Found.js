import React from "react";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import "./Found.css";

function Found() {
  return (
    <div className="result">
      <h1 className="result__title">Результаты поиска</h1>
      <NewsCardList />
      <button className="result__more" type="button">
        Показать ещё
      </button>
      <Preloader />
    </div>
  );
}

export default Found;
