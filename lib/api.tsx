/* eslint-disable import/no-anonymous-default-export */
import qs from 'qs';
import axios, {
	AxiosInstance,
	// InternalAxiosRequestConfig
} from 'axios';
import { getItem } from './misc';

class Api {
	instance: AxiosInstance;
	constructor() {
		this.instance = axios.create({
			baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
			withCredentials: true,
			validateStatus: (status) => {
				return status >= 200 && status <= 500;
			},
		});

		this.instance.interceptors.request.use((config: any) => {
			let headers = {};
			const token = getItem('quedoor-token');
			if (token) {
				headers = {
					...headers,
					authorization: `Bearer ${token}`,
				};
			}

			return {
				...config,
				headers: {
					...headers,
					...config.headers,
				},
			};
		});
	}

	updateContentType = (contentType: string) => {
		this.instance.defaults.headers.common['Content-Type'] = contentType;
	};

	async get(url: string, params = {}) {
		const _params = qs.stringify(params, { arrayFormat: 'repeat' });
		let _url = url;
		if (_params) {
			_url += `?${_params}`;
		}
		return await this.instance.get(_url);
	}

	async put(url: string, data = {}, headers = {}) {
		const { data: res } = await this.instance.put(url, data, {
			headers,
		});
		return res;
	}
	async post(url: string, data = {}, params = {}) {
		const _params = qs.stringify(params, { arrayFormat: 'repeat' });
		let _url = url;
		if (_params) {
			_url += `?${_params}`;
		}
		const { data: res } = await this.instance.post(_url, data);
		return res;
	}

	async delete(url: string, params = {}) {
		return this.instance.delete(url, { params });
	}
}

export default new Api();
