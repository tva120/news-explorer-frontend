import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Navigation.css';

function Navigation({ toggleForm, isLightTheme, isPopupOpen, handleBurger, isMenuOpen, loggedIn, handleLogOut }) {
	const [name, setName] = React.useState('');
	const { currentUser } = React.useContext(CurrentUserContext);
	const history = useHistory();

	const handleEllipse = () => {
		handleBurger();
		toggleForm();
	};

	function handleEllipseClose() {
		handleLogOut();
		history.push('/');
	}

	React.useEffect(() => {
		setName(currentUser.name);
	}, [currentUser]);

	return (
		<>
			<NavLink
				to="/"
				className={`header__title ${isLightTheme ? 'header_light-theme' : ''} ${
					isMenuOpen ? 'header_light-theme' : ''
				}`}
			>
				NewsExplorer
			</NavLink>

			{isPopupOpen ? (
				''
			) : (
				<div onClick={handleBurger} className={`header__burger ${isMenuOpen ? 'change' : ''}`}>
					<span
						className={`header__burger-line ${isLightTheme ? '' : 'header__burger-line_black'} ${
							isMenuOpen ? 'header__burger-line_esc header__burger-line_white' : ''
						}`}
					></span>
					<span
						className={`header__burger-line ${isLightTheme ? '' : 'header__burger-line_black'} ${
							isMenuOpen ? 'header__burger-line_esc header__burger-line_white' : ''
						}`}
					></span>
				</div>
			)}
			<nav className={isMenuOpen ? 'header__background header__background_visible' : 'header__background'}>
				<NavLink
					to="/"
					className={`header__link ${
						isLightTheme ? 'header_light-theme header__link_active header__link_active_light-theme' : ''
					}${isMenuOpen ? 'header_light-theme' : ''}`}
				>
					Главная
				</NavLink>
				{loggedIn ? (
					<NavLink
						to="/saved-news"
						className={`header__link 
            ${isLightTheme ? 'header_light-theme' : 'header__link_active'} 
            ${isMenuOpen ? 'header_light-theme' : ''}`}
					>
						Сохраненные статьи
					</NavLink>
				) : (
					''
				)}
				<span
					onClick={loggedIn ? handleEllipseClose : handleEllipse}
					className={`header__ellipse ${isLightTheme ? 'header_light-theme' : 'header__ellipse_dark'} ${
						isMenuOpen ? 'header__ellipse_light' : ''
					} `}
				>
					<span className={`header__ellipse-link ${isMenuOpen || isLightTheme ? 'header_light-theme' : ''}`}>
						{name || 'Авторизоваться'}
					</span>
					{name ? <span className={`header__logout ${isLightTheme ? 'header__logout_light' : ''} `} /> : ''}
				</span>
			</nav>
		</>
	);
}

export default Navigation;
//loggedIn ? handleEllipseClose :
