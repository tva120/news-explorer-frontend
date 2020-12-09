const API_KEY = 'edfa5e01a692497ca17f85c13178398f';
const BASE_URL = 'https://nomoreparties.co/news/v2/everything?';
const DATE_LOCAL = new Date();
const DATE_FROM = DATE_LOCAL.toISOString();
const DATE_TO = new Date(DATE_LOCAL.setDate(DATE_LOCAL.getDate() - 7)).toISOString();

class NewsApi {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}

	_getData(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getSearch(keyword) {
		return fetch(`${this._baseUrl}&q=${keyword}`, {
			headers: this._headers,
		}).then((res) => {
			return this._getData(res);
		});
	}
}

export const newsApi = new NewsApi({
	baseUrl:
		BASE_URL +
		`from=${DATE_FROM}&` +
		`to=${DATE_TO}&` +
		'sortBy=popularity&' +
		'pageSize=100&' +
		`apiKey=${API_KEY}`,
	headers: {
		'Content-Type': 'application/json',
	},
});
