import React from 'react';
import { useHistory } from 'react-router-dom';
import { MakeValidation } from '../../utils/Validation';
import './Login.css';

const Login = ({ isConfirm, setErrorMessage, isPopupOpen, toggleForm, onLoginSubmit, setIsRegisterOpen }) => {
	const [loginEmail, setLoginEmail] = React.useState('');
	const [loginPassword, setLoginPassword] = React.useState('');
	const history = useHistory();
	const validate = MakeValidation();

	React.useEffect(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && isPopupOpen) {
				toggleForm();
			}
		});
	}, [toggleForm, isPopupOpen]);

	const handleEmailChange = (e) => {
		setLoginEmail(e.target.value);
		validate.handleChange(e);
	};

	const handlePasswordChange = (e) => {
		setLoginPassword(e.target.value);
		validate.handleChange(e);
	};

	function handleClose(e) {
		if (e.target.classList.contains('popup')) {
			toggleForm();
			validate.resetForm();
		}
	}

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		onLoginSubmit(loginEmail, loginPassword);
		history.push('/');
	};

	const handleLink = () => {
		setIsRegisterOpen(true);
		setErrorMessage('');
		toggleForm();
	};

	return (
		<div onClick={handleClose} className={`popup popup_login ${isPopupOpen ? '' : 'popup_hidden'}`}>
			<form onSubmit={MakeValidation} className={'popup__container popup__container_login'}>
				<button onClick={toggleForm} className={'button-close button-close_login'} type="button" />
				<h2 className={'popup__title'}>Вход</h2>
				{isConfirm ? (
					''
				) : (
					<>
						<>
							<div className="popup-input__block">
								<span className="popup-input__name">Email</span>
								<input
									onChange={handleEmailChange}
									type="email"
									name="email"
									placeholder="Введите почту"
									required
									className="popup__input"
								/>
								<span className="popup__input_text_error">{validate.errors.email}</span>
							</div>
							<div className="popup-input__block">
								<span className="popup-input__name">Пароль</span>
								<input
									onChange={handlePasswordChange}
									type="password"
									name="password"
									placeholder="Введите пароль"
									required
									minLength="8"
									className="popup__input"
								/>
								<span className="popup__input_text_error">{validate.errors.password}</span>
							</div>
						</>
						<button
							type="submit"
							className={validate.isValid ? 'popup__button popup__button_active' : 'popup__button'}
							onClick={handleLoginSubmit}
							disabled={!validate.isValid}
						>
							Войти
						</button>
					</>
				)}
				<span className="popup__description">
					Или
					<span onClick={handleLink} className="popup__link">
						{' '}
						Зарегистрироваться
					</span>
				</span>
			</form>
		</div>
	);
};

export default Login;
