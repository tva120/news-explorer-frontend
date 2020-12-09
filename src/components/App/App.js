import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

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
			.catch(() => {
				setErrorMessage('Ошибка авторизациии');
			});
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
				setErrorMessage('Пользователь существует');
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
						setErrorMessage('');
					}
				})
				.catch(() => {
					setErrorMessage('Ошибка проврки токена');
				});
		}
		return () => {};
	};

	const handleLogOut = () => {
		setLoggedIn(false);
		setCurrentUser({});
		setSavedArticles([]);
		localStorage.removeItem('token');
	};
	React.useEffect(() => {
		setKeyWord(localStorage.getItem('search'));
	}, [loggedIn]);

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
								handleLogOut={handleLogOut}
								handleRegistrationSubmit={handleRegistrationSubmit}
								setIsExtraPopupOpen={setIsExtraPopupOpen}
								isExtraPopupOpen={isExtraPopupOpen}
							/>
						</Route>
						<ProtectedRoute
							path="/saved-news"
							loggedIn={loggedIn}
							savedArticles={savedArticles}
							setSavedArticles={setSavedArticles}
							handleLogOut={handleLogOut}
							exact
							component={SavedNews}
						></ProtectedRoute>
					</Switch>
				</BrowserRouter>
			</CurrentUserContext.Provider>
		</div>
	);
};

export default App;
