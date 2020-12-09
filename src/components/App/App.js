import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import { api } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const token = localStorage.getItem('token');

const App = () => {
	const [savedArticles, setSavedArticles] = React.useState([]);
	const [loggedIn, setLoggedIn] = React.useState(!!token);
	const [keyWord, setKeyWord] = React.useState('');

	const [errorMessage, setErrorMessage] = React.useState('');
	const [isRegister, setIsRegister] = React.useState(false);
	const [currentUser, setCurrentUser] = React.useState({});
	const [isExtraPopupOpen, setIsExtraPopupOpen] = React.useState(false);

	//setLoggedIn();

	React.useEffect(() => {
		setKeyWord(localStorage.getItem('search'));
	}, [loggedIn]);

	const [isLoginOpen, setIsLoginOpen] = React.useState(false);

	const handleLoginSubmit = (loginEmail, loginPassword) => {
		api.signin(loginEmail, loginPassword)
			.then((res) => {
				if (res.token) {
					localStorage.setItem('token', res.token);
					setLoggedIn(true);
					tokenCheck();
					setIsLoginOpen(false);
				}
			})
			.catch((err) => console.warn(err));
	};

	const handleRegistrationSubmit = (password, email, name) => {
		api.signup(password, email, name, setIsRegister)
			.then(() => {
				setLoggedIn(true);
				setIsRegister(false);
				setErrorMessage('');
				setIsExtraPopupOpen(true);
			})
			.catch(() => {
				setErrorMessage('Такой пользователь уже есть');
			});
	};

	const tokenCheck = () => {
		const token = localStorage.getItem('token');
		if (token) {
			api.getToken(token)
				.then((res) => {
					if (res) {
						setLoggedIn(true);
						setCurrentUser(res);
					}
				})
				.catch((err) => console.warn(err));
		}
		return () => {};
	};

	const handleLoginOut = () => {
		setLoggedIn(false);
		setCurrentUser({});
		setSavedArticles([]);
		localStorage.removeItem('token');
	};

	React.useEffect(() => {
		tokenCheck();
		setKeyWord(localStorage.getItem('search'));
	}, [loggedIn]);

	return (
		<div className="App">
			<CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/">
							<Main
								loggedIn={loggedIn}
								setLoggedIn={setLoggedIn}
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
								keyWord={keyWord}
								setKeyWord={setKeyWord}
								setSavedArticles={setSavedArticles}
								savedArticles={savedArticles}
								handleLoginSubmit={handleLoginSubmit}
								isRegister={isRegister}
								setIsRegister={setIsRegister}
								isLoginOpen={isLoginOpen}
								setIsLoginOpen={setIsLoginOpen}
								setErrorMessage={setErrorMessage}
								errorMessage={errorMessage}
								handleLoginOut={handleLoginOut}
								handleRegistrationSubmit={handleRegistrationSubmit}
								setIsExtraPopupOpen={setIsExtraPopupOpen}
								isExtraPopupOpen={isExtraPopupOpen}
							/>
						</Route>
						<Route path="/saved-news">
							<SavedNews
								loggedIn={loggedIn}
								savedArticles={savedArticles}
								setSavedArticles={setSavedArticles}
								handleLoginOut={handleLoginOut}
							/>
						</Route>
					</Switch>
				</BrowserRouter>
			</CurrentUserContext.Provider>
		</div>
	);
};
export default React.memo(App);
//export default App;
