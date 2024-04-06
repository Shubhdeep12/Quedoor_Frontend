import api from '@/lib/api';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchPeople = async (pageParam = 1, filter: any) => {
	const params = {
		limit: 30,
		page: pageParam,
	};
	const url =
		filter.type === 'followers'
			? `/users/${filter.userId}/followers`
			: filter.type === 'following'
			? `/users/${filter.userId}/following`
			: '/users';
	const res = await api.get(url, params);
	if (res) {
		return res.data.result;
	}
	return null;
};

export const useInfinitePeopleList = (filter: object) => {
	return {
		...useInfiniteQuery({
			queryKey: ['people', JSON.stringify(filter || {})],
			queryFn: ({ pageParam }) => fetchPeople(pageParam, filter),
			initialPageParam: 1,
			getNextPageParam: (lastPage) => {
				const nextPage = lastPage.page + 1;
				return lastPage.data.length < 10 ? undefined : nextPage;
			},
			staleTime: 5000,
		}),
	};
};

export const unFollowUser = async (payload: any) => {
	const res = await api.post('/users/unfollow', payload);
	return res;
};

export const followUser = async (payload: any) => {
	const res = await api.post('/users/follow', payload);
	return res;
};

export const updateUser = async (userId?: number, payload?: any) => {
	const res = await api.put(`/users/${userId}`, payload);
	return res;
};
