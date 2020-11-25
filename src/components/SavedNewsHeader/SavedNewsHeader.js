import React from "react";
import "./SavedNewsHeader.css";

function SavedNewsHeader() {
  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__title">Сохранённые статьи</p>
        <p className="saved-news-header__call">
          Грета, у вас 5 сохранённых статей
        </p>
        <p className="saved-news-header__tags">
          По ключевым словам: Природа, Тайга и 2-м другим
        </p>
      </div>
    </section>
  );
}

export default SavedNewsHeader;
