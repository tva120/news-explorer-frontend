import React from 'react';
import './Register.css';
import { MakeValidation } from '../../utils/Validation';

const Register = ({
	isPopupOpen,
	setErrorMessage,
	toggleForm,
	errorMessage,
	handleRegistrationSubmit,
	setIsLoginOpen,
}) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [name, setName] = React.useState('');

	const { values, handleChange, errors, isValid, resetForm } = MakeValidation();

	React.useEffect(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && isPopupOpen) {
				toggleForm();
			}
		});
	}, [toggleForm, isPopupOpen]);

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
		handleChange(e);
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
		handleChange(e);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		handleChange(e);
	};

	function handleClose(e) {
		if (e.target.classList.contains('popup')) {
			toggleForm();
			resetForm();
		}
	}

	const handleRegisterSubmit = (e) => {
		e.preventDefault();
		if (!values.email || !values.password || !values.name) {
			return;
		}
		handleRegistrationSubmit(password, email, name);
		toggleForm();
	};
	const handleLink = () => {
		setIsLoginOpen(true);
		setErrorMessage('');
		toggleForm();
	};

	return (
		<div onClick={handleClose} className={`popup popup_login ${isPopupOpen ? '' : 'popup_hidden'}`}>
			<form onSubmit={MakeValidation} className={'popup__container popup__container_login'}>
				<button onClick={toggleForm} className={'button-close button-close_login'} type="button" />
				<h2 className={'popup__title'}>Регистрация</h2>
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
							<span className="popup__input_text_error">{errors.email}</span>
						</div>
						<div className="popup-input__block">
							<span className="popup-input__name">Пароль</span>
							<input
								onChange={handlePasswordChange}
								type="password"
								name="password"
								minLength="8"
								placeholder="Введите пароль"
								required
								className="popup__input"
							/>
							<span className="popup__input_text_error">{errors.password}</span>
						</div>
						<div className="popup-input__block">
							<span className="popup-input__name">Имя</span>
							<input
								onChange={handleNameChange}
								type="text"
								name="name"
								minLength="2"
								maxLength="200"
								pattern="^[а-яёА-ЯЁa-zA-Z0-9-\s]+$"
								placeholder="Введите свое имя"
								required
								className="popup__input"
							/>
							<span className="popup__input_text_error">{errors.name}</span>
						</div>
					</>
					<span className="popup__input_text_error">{errorMessage}</span>
					<button
						type="submit"
						className={isValid ? 'popup__button popup__button_active' : 'popup__button'}
						onClick={handleRegisterSubmit}
						disabled={!isValid}
					>
						Зарегистрироваться
					</button>
				</>
				<span className="popup__description">
					Или
					<span onClick={handleLink} className="popup__link">
						{' '}
						Войти
					</span>
				</span>
			</form>
		</div>
	);
};

export default Register;
