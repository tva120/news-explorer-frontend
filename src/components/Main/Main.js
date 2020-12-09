import React from 'react';
import { useLocation } from 'react-router-dom';
import './Main.css';
import Header from '../Header/Header';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { newsApi } from '../../utils/NewsApi';

const Main = ({
	loggedIn,
	setLoggedIn,
	currentUser,
	setCurrentUser,
	setKeyWord,
	keyWord,
	setSavedArticles,
	savedArticles,
	handleLoginSubmit,
	isExtraPopupOpen,
	setIsExtraPopupOpen,
	isRegister,
	setIsRegister,
	setErrorMessage,
	errorMessage,
	handleLoginOut,
	handleRegistrationSubmit,
	isLoginOpen,
	setIsLoginOpen,
}) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [articles, setArticles] = React.useState([]);
	const { search: needLogin } = useLocation();

	const toggleLoginForm = () => {
		setIsLoginOpen(!isLoginOpen);
	};
	const toggleRegisterForm = () => {
		setIsRegister(!isRegister);
	};

	const togglePopup = () => {
		setIsExtraPopupOpen(!isExtraPopupOpen);
	};

	const search = (value) => {
		setIsLoading(true);
		newsApi
			.getSearch(value)
			.then((data) => {
				localStorage.setItem('articles', JSON.stringify(data.articles));
				localStorage.setItem('search', value);
				setArticles(data.articles);
			})
			.catch((err) => console.warn(err))
			.finally(() => {
				setIsLoading(false);
			});
	};

	React.useEffect(() => {
		if (needLogin.includes('need')) {
			setIsLoginOpen(true);
		}
	}, [needLogin, setIsLoginOpen]);

	React.useEffect(() => {
		setArticles(JSON.parse(localStorage.getItem('articles')));
	}, []);

	return (
		<>
			<div className="main">
				<Header
					toggleForm={toggleLoginForm}
					isLightTheme={true}
					isPopupOpen={isLoginOpen}
					handleLoginOut={handleLoginOut}
					loggedIn={loggedIn}
					setLoggedIn={setLoggedIn}
					isLoginOpen={isLoginOpen}
					setIsLoginOpen={setIsLoginOpen}
					currentUser={currentUser}
					setCurrentUser={setCurrentUser}
					toggleLoginForm={toggleLoginForm}
				/>
				<SearchForm search={search} setKey={setKeyWord} />
			</div>
			{keyWord === null ? (
				''
			) : (
				<>
					{!Array.isArray(articles) || articles.length === 0 ? (
						''
					) : (
						<NewsCardList
							main={true}
							loggedIn={loggedIn}
							articles={articles}
							setArticles={setArticles}
							savedArticles={savedArticles}
							setSavedArticles={setSavedArticles}
							keyword={keyWord}
						/>
					)}
					{isLoading ? <Preloader /> : ''}
					{Array.isArray(articles) ? articles.length === 0 ? <NotFound /> : '' : ''}
				</>
			)}

			<About />
			<Footer />

			<PopupWithForm isPopupOpen={isExtraPopupOpen} toggleForm={togglePopup} setIsLoginOpen={setIsLoginOpen} />
			<Login
				isPopupOpen={isLoginOpen}
				toggleForm={toggleLoginForm}
				setIsRegisterOpen={setIsRegister}
				setErrorMessage={setErrorMessage}
				onLoginSubmit={handleLoginSubmit}
			/>
			<Register
				isPopupOpen={isRegister}
				toggleForm={toggleRegisterForm}
				handleRegistrationSubmit={handleRegistrationSubmit}
				setIsLoginOpen={setIsLoginOpen}
				setErrorMessage={setErrorMessage}
				errorMessage={errorMessage}
			/>
		</>
	);
};

export default Main;
//<PopupWithForm toggleForm={handleForm} isLoggedIn={false} isLogin={false} isPopupOpen={isPopupOpen} />
