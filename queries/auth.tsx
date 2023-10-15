import api from '@/utils/api';

export const register = async (data: any) => {
	const res = await api.post(`/auth/register`, data);
	return res;
};

export const login = async (data: any) => {
	const res = await api.post(`/auth/login`, data);
	return res;
};

export const logout = async () => {
	const res = await api.post('/auth/logout');
	return res;
};

export const getMe = async (token: string) => {
	const res = await api.get(`/me/${token}`);
	return res;
};
