import api from '@/lib/api';

export const uploadAttachment = async (body: any) => {
	const res = await api.post('/attachment/', body);
	return res;
};

export const deleteAttachment = async (body: any) => {
	const res = await api.delete('/attachment/', body);
	return res;
};
