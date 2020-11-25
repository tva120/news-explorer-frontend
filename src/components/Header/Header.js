import React from "react";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = ({ isLightTheme, toggleForm, isSaved, isPopupOpen, user }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleBurger = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <div className="header__container">
        <Navigation
          toggleForm={toggleForm}
          isLightTheme={isLightTheme}
          isSaved={isSaved}
          isPopupOpen={isPopupOpen}
          handleBurger={handleBurger}
          isMenuOpen={isMenuOpen}
          user={user}
        />
      </div>
    </div>
  );
};

export default Header;
