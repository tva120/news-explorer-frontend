const BASE_URL = 'https://api.tva120.students.nomoreparties.xyz';

export class MainApi {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}

	getArticles() {
		return fetch(`${this._baseUrl}/articles`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}).then((res) => {
			if (res.ok) {
				return res.json().catch(() => res);
			}

			return Promise.reject(`Ошибка: ${res.status}`);
		});
	}

	setNewCard(keyword, title, text, date, source, link, image) {
		return fetch(`${this._baseUrl}/articles`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({
				keyword: keyword,
				title: title,
				text: text,
				date: date,
				source: source,
				link: link,
				image: image,
			}),
		}).then((res) => {
			if (res.status === 200) {
				return res.json();
			}
			return Promise.reject(res.json());
		});
	}

	deleteArticle(id) {
		return fetch(`${this._baseUrl}/articles/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		}).then((res) => {
			if (res.ok) {
				return res.json().catch(() => res);
			}

			return Promise.reject(`Ошибка: ${res.status}`);
		});
	}

	signup = (password, email, name, info) => {
		return fetch(`${this._baseUrl}/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({ password, email, name }),
		}).then((res) => {
			if (res.ok) {
				info({ success: 'Регистрация выполнена!' });
				return res.json();
			}
			info({ fail: 'Произошла ошибка. Попрбуйте позже!' });
			return Promise.reject(
				res.status === 400 ? `Ошибка валидации ${res.status}` : `Неизвестная ошибка ${res.status}`
			);
		});
	};

	signin = (email, password) => {
		return fetch(`${this._baseUrl}/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},

			body: JSON.stringify({
				email,
				password,
			}),
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(
				res.status === 400
					? `Ошибка валидации ${res.status}`
					: `Неизвестная комбинация логин/пароль ${res.status}`
			);
		});
	};

	getToken = (token) => {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return res.json().then((data) => Promise.reject(`Ошибка авторизации: ${res.status} - ${data.error}`));
		});
	};
}

export const api = new MainApi({
	baseUrl: BASE_URL,
	headers: {
		authorization: `Bearer ${localStorage.getItem('token')}`,
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});
