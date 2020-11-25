import React from "react";
import "./Main.css";
import Header from "../Header/Header";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Found from "../Found/Found";
import SearchForm from "../SearchForm/SearchForm";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const Main = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const handleForm = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  return (
    <>
      <div className="main">
        <Header
          toggleForm={handleForm}
          isLightTheme={true}
          isPopupOpen={isPopupOpen}
        />
        <SearchForm />
      </div>
      <Found />
      <About />
      <Footer />
      <PopupWithForm
        toggleForm={handleForm}
        isLoggedIn={false}
        isLogin={false}
        isPopupOpen={isPopupOpen}
      />
    </>
  );
};

export default Main;
