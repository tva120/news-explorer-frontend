import React, { useState } from 'react';
import './NewsCard.css';
import { api } from '../../utils/MainApi';

function NewsCard({ isSaved, id, title, text, source, image, date, link, setSavedArticles, loggedIn, tag, keyword }) {
	const [isButtonClick, setIsButtonClick] = useState(false);

	function handleButtonClick() {
		setIsButtonClick(!isButtonClick);
	}
	const [isDelete, setIsDelete] = React.useState(false);
	const [isFavourite, setIsFavourite] = React.useState(false);

	const handleTrash = () => {
		setIsDelete(!isDelete);
	};
	const handleDelete = () => {
		api.deleteArticle(id)
			.then(() => {
				api.getArticles()
					.then((data) => {
						setSavedArticles(data);
					})
					.catch((err) => console.error(err));
			})
			.catch((err) => console.warn(err));
		handleTrash();
	};
	const handleFavourite = () => {
		if (loggedIn) {
			api.setNewCard(keyword, title, text, date, source, link, image)
				.then(() => {
					setIsFavourite(!isFavourite);
				})
				.catch((err) => console.warn(err));
		} else {
			handleButtonClick();
		}
	};

	const timestamp = Date.parse(date);
	const dateTemp = new Date(timestamp);
	const dayAndMonth = dateTemp.toLocaleString('default', { day: 'numeric', month: 'long' });
	const year = dateTemp.getFullYear();
	const newDate = `${dayAndMonth}, ${year}`;

	return (
		<div className="card">
			<a className="card__link" href={link} target="_blank" rel="noreferrer">
				<img className="card__image" src={image} alt={title} />
				{tag ? <p className="card__tag card__tag_position-left">{tag}</p> : ''}
				<p className="card__date">{newDate}</p>
				<h2 className="card__title">{title}</h2>
				<p className="card__text">{text}</p>
				<p className="card__source">{source}</p>
			</a>

			<span
				onClick={handleDelete}
				className={`${isDelete ? 'card__tag_visible' : ''} card__tag card__tag_position-right `}
			>
				Убрать из сохраненных
			</span>
			<button
				onClick={isSaved ? handleTrash : handleFavourite}
				className={
					tag
						? 'card__button card__button_delete'
						: `card__button card__button_save ${isFavourite ? 'card__button_save_active' : ''}`
				}
			/>
			{tag ? '' : isButtonClick && <p className="card__button-label">Войдите, чтобы сохранять статьи</p>}
		</div>
	);
}

export default NewsCard;
