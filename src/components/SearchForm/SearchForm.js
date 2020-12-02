import React from "react";
import "./SearchForm.css";

function SearchForm() {
  return (
    <div className="searchForm">
      <h1 className="searchForm__title">Что творится в мире?</h1>
      <p className="searchForm__about">
        Находите самые свежие статьи на любую тему и сохраняйте в своём личном
        кабинете.
      </p>
      <form className="searchForm__form">
        <input className="searchForm__input" placeholder="Погода"></input>
        <button className="searchForm__button">Искать</button>
      </form>
    </div>
  );
}

export default SearchForm;
