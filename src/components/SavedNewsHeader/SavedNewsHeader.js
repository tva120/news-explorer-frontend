import React from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/MainApi';

function SavedNewsHeader() {
	const [quantity, setQuantity] = React.useState();
	const { currentUser } = React.useContext(CurrentUserContext);
	const [tags, setTags] = React.useState([]);
	const [name, setName] = React.useState('');

	const getQuantityOfArticles = () => {
		api.getArticles()
			.then((res) => {
				setQuantity(res.length);
				const array = res.map((item) => {
					return item.keyword;
				});
				setTags(array.reduce((a, x) => (a.includes(x) ? a : [...a, x]), []).sort());
			})
			.catch((err) => console.error(err));
	};

	function declOfNum(num, titles) {
		const cases = [2, 0, 1, 1, 1, 2];
		return titles[num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]];
	}
	const savedText = declOfNum(quantity, ['сохранённая статья', 'сохранённые статьи', 'сохранённых статей']);

	React.useEffect(() => {
		getQuantityOfArticles();
		setName(currentUser.name);
	}, [currentUser]);

	return (
		<section className="saved-news-header">
			<div className="saved-news-header__container">
				<p className="saved-news-header__title">Сохраненные статьи</p>
				<h1 className="saved-news-header__call">{`${name}, у вас ${quantity || 0} ${savedText}`}</h1>
				<span className="saved-news-header__tags">
					По ключевым словам:{' '}
					<span className="tag">
						{tags.length === 0
							? ''
							: `${tags[0]}, ${tags[1] ? tags[1] : ''} и ${
									tags.length - 2 > 0 ? tags.length - 2 : 0
							  } другим.`}
					</span>
				</span>
			</div>
		</section>
	);
}

export default SavedNewsHeader;
