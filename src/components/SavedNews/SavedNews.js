import React from 'react';
import './SavedNews.css';
import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import Footer from '../Footer/Footer';

function SavedNews({ loggedIn, handleLogOut, savedArticles, setSavedArticles }) {
	return (
		<>
			<Header loggedIn={loggedIn} handleLogOut={handleLogOut} />
			<SavedNewsHeader />
			<NewsCardList
				saved={true}
				loggedIn={loggedIn}
				savedArticles={savedArticles}
				setSavedArticles={setSavedArticles}
			/>

			<Footer />
		</>
	);
}

export default SavedNews;
