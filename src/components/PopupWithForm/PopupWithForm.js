import React from 'react';
import './PopupWithForm.css';

const PopupWithForm = ({ isPopupOpen, toggleForm, setIsLoginOpen }) => {
	function handleClose(e) {
		if (e.target.classList.contains('popup')) {
			toggleForm();
		}
	}
	const handleSignIn = () => {
		setIsLoginOpen(true);
		toggleForm();
	};

	React.useEffect(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && isPopupOpen) {
				toggleForm();
			}
		});
	}, [toggleForm, isPopupOpen]);

	return (
		<div onClick={handleClose} className={`popup popup_login ${isPopupOpen ? '' : 'popup_hidden'}`}>
			<form className={'popup__container popup__container_login'}>
				<button onClick={toggleForm} className={'button-close button-close_login'} type="button" />
				<h2 className={'popup__title'}>Пользователь успешно зарегистрирован!</h2>
				<span onClick={handleSignIn} className="popup__link">
					Войти
				</span>
			</form>
		</div>
	);
};

export default PopupWithForm;
