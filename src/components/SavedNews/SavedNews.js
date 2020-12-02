import React from "react";
import "./SavedNews.css";
import Header from "../Header/Header";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import Footer from "../Footer/Footer";

function SavedNews() {
  return (
    <>
      <Header isSaved={true} name="Vadim" />
      <SavedNewsHeader />
      <NewsCardList />
      <Footer />
    </>
  );
}

export default SavedNews;
