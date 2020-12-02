import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({
  toggleForm,
  isLightTheme,
  isSaved,
  user,
  isPopupOpen,
  handleBurger,
  isMenuOpen,
}) => {
  const history = useHistory();
  const handleEllipse = () => {
    handleBurger();
    toggleForm();
  };
  const handleEllipseClose = () => {
    history.push("/");
  };
  return (
    <>
      <NavLink
        to="/"
        className={`header__title ${isLightTheme ? "header_light-theme" : ""} ${
          isMenuOpen ? "header_light-theme" : ""
        }`}
      >
        NewsExplorer
      </NavLink>

      {isPopupOpen ? (
        ""
      ) : (
        <div
          onClick={handleBurger}
          className={`header__burger ${isMenuOpen ? "change" : ""}`}
        >
          <span
            className={`header__burger-line ${
              isLightTheme ? "" : "header__burger-line_black"
            } ${
              isMenuOpen
                ? "header__burger-line_esc header__burger-line_white"
                : ""
            }`}
          ></span>
          <span
            className={`header__burger-line ${
              isLightTheme ? "" : "header__burger-line_black"
            } ${
              isMenuOpen
                ? "header__burger-line_esc header__burger-line_white"
                : ""
            }`}
          ></span>
        </div>
      )}
      <nav
        className={
          isMenuOpen
            ? "header__background header__background_visible"
            : "header__background"
        }
      >
        <NavLink
          to="/"
          className={`header__link ${
            isLightTheme
              ? "header_light-theme header__link_active header__link_active_light-theme"
              : ""
          }${isMenuOpen ? "header_light-theme" : ""}`}
        >
          Главная
        </NavLink>
        {isSaved ? (
          <NavLink
            to="/saved-news"
            className={`header__link ${
              isMenuOpen ? "header_light-theme" : "header__link_active"
            }`}
          >
            Сохраненные статьи
          </NavLink>
        ) : (
          ""
        )}
        <span
          onClick={isSaved ? handleEllipseClose : handleEllipse}
          className={`header__ellipse ${
            isLightTheme ? "header_light-theme" : "header__ellipse_dark"
          } ${isMenuOpen ? "header__ellipse_light" : ""} `}
        >
          <span
            className={`header__ellipse-link ${
              isMenuOpen || isLightTheme ? "header_light-theme" : ""
            }`}
          >
            {user ? user : "Авторизоваться"}
          </span>
          {user ? <span className="header__logout" /> : ""}
        </span>
      </nav>
    </>
  );
};

export default Navigation;
