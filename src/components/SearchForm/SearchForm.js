import React from 'react';
import { MakeValidation } from '../../utils/Validation';
import './SearchForm.css';

function SearchForm({ search, setKey }) {
	const [value, setValue] = React.useState('');
	const validation = MakeValidation();

	const changeInput = (e) => {
		setValue(e.target.value);
		validation.handleChange(e);
	};

	const onClickSearch = (e) => {
		e.preventDefault();
		search(value);
		validation.resetForm();
	};

	return (
		<div className="searchForm">
			<h1 className="searchForm__title">Что творится в мире?</h1>
			<p className="searchForm__about">
				Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
			</p>
			<form className="searchForm__form">
				<input
					required
					onChange={changeInput}
					id="key"
					name="key"
					type="text"
					className="searchForm__input"
					placeholder="Погода"
				></input>

				<span className="search__error">{validation.errors.key}</span>
				<button onClick={onClickSearch} className="searchForm__button">
					Искать
				</button>
			</form>
		</div>
	);
}

export default SearchForm;
