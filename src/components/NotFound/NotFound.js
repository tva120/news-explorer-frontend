import React from 'react';
import './NotFound.css';

function NotFound() {
	return (
		<div className="notFound notFound_active">
			<div className="notFound__img" />
			<h2 className="notFound__title">Ничего не найдено</h2>
			<p className="notFound__text">К сожалению по вашему запросу ничего не найдено.</p>
		</div>
	);
}

export default NotFound;
