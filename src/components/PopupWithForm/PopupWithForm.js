import React from "react";
import { NavLink } from "react-router-dom";
import "./PopupWithForm.css";

const PopupWithForm = ({ isLoggedIn, isLogin, isPopupOpen, toggleForm }) => {
  React.useEffect(() => {
    document.addEventListener("keydown", (keypress) => {
      if (keypress.key === "Escape" && isPopupOpen) {
        toggleForm();
      }
    });
  }, [toggleForm, isPopupOpen]);

  function handleClose(element) {
    if (element.target.classList.contains("popup")) {
      toggleForm();
    }
  }

  const formProps = isLogin
    ? {
        title: "Вход",
        button: "Войти",
        link: "Зарегистрироваться",
      }
    : isLoggedIn
    ? {
        title: "Пользователь успешно зарегистрирован!",
        link: "Войти",
      }
    : {
        title: "Регистрация",
        button: "Зарегистрироваться",
        link: "Войти",
      };

  return (
    <div
      onClick={handleClose}
      className={`popup popup_login ${isPopupOpen ? "" : "popup_hidden"}`}
    >
      <form className={`popup__container popup__container_login`}>
        <button
          onClick={toggleForm}
          className={`button-close button-close_login`}
          type="button"
        />
        <h2 className={`popup__title`}>{formProps.title}</h2>
        {isLoggedIn ? (
          ""
        ) : (
          <>
            <>
              <div className="popup-input__block">
                <span className="popup-input__name">Email</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Введите почту"
                  required
                  className="popup__input"
                />
                <span className="popup__input_text_error" />
              </div>
              <div className="popup-input__block">
                <span className="popup-input__name">Пароль</span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Введите пароль"
                  required
                  className="popup__input"
                />
                <span className="popup__input_text_error"></span>
              </div>
            </>
            <button type="submit" className="popup__button">
              {" "}
              {formProps.button}{" "}
            </button>
          </>
        )}

        <span className="popup__description">
          {isLoggedIn ? "" : "Или "}{" "}
          <NavLink to="/" className="popup__link">
            {formProps.link}
          </NavLink>{" "}
        </span>
      </form>
    </div>
  );
};
export default PopupWithForm;
