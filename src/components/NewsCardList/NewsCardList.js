import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

import { api } from '../../utils/MainApi';

const NewsCardList = ({
	main,
	saved,
	articles,
	keyword,
	savedArticles,
	setSavedArticles,
	loggedIn,
	toggleLoginForm,
}) => {
	const [numbersArticle, setNumbersArticle] = React.useState(3);

	const handleAddArticles = () => {
		setNumbersArticle(numbersArticle + 3);
	};

	const getArticles = () => {
		if (loggedIn) {
			api.getArticles()
				.then((res) => {
					setSavedArticles(res);
				})
				.catch((err) => console.error(err));
		}
	};

	React.useEffect(() => {
		getArticles();
	}, []);

	return (
		<div className="newsCardList">
			<div className="newsCardList__block">
				{main ? <h2 className="newsCardList__title">Результаты поиска</h2> : ''}
				<div className="cards">
					{saved ? (
						<>
							{savedArticles !== (undefined || null)
								? savedArticles.slice(0, numbersArticle).map((item) => {
										return (
											<NewsCard
												title={item.title}
												text={item.text}
												author={item.name}
												image={item.image}
												item={item}
												id={item._id}
												date={item.date}
												link={item.url}
												loggedIn={loggedIn}
												isSaved={true}
												savedArticles={savedArticles}
												setSavedArticles={setSavedArticles}
												tag={item.keyword}
												getSavedArticles={getArticles}
												key={Math.random() * 13711131719}
											/>
										);
								  })
								: ''}
						</>
					) : (
						''
					)}
					{main ? (
						<>
							{articles !== (undefined || null)
								? articles.slice(0, numbersArticle).map((item) => {
										return (
											<NewsCard
												title={item.title}
												text={item.description}
												source={item.source.name}
												toggleLoginForm={toggleLoginForm}
												loggedIn={loggedIn}
												image={item.urlToImage}
												item={item}
												date={item.publishedAt.substring(0, 10)}
												link={item.url}
												keyword={keyword}
												key={item.url}
											/>
										);
								  })
								: articles.slice(0, numbersArticle).map((item) => {
										return (
											<NewsCard
												title={item.title}
												text={item.description}
												author={item.source.name}
												toggleLoginForm={toggleLoginForm}
												loggedIn={loggedIn}
												image={item.urlToImage}
												item={item}
												date={item.publishedAt.substring(0, 10)}
												link={item.url}
												tag={keyword}
												key={item.url}
											/>
										);
								  })}
						</>
					) : (
						''
					)}
				</div>
				{(main && numbersArticle < articles.length) ||
				(!main && savedArticles !== (undefined || null) && numbersArticle < savedArticles.length) ? (
					<button onClick={handleAddArticles} className="newsCardList__button">
						Показать еще
					</button>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default NewsCardList;
