import api from '@/utils/api';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchPosts = async ({ pageParam = 1 }) => {
	const params = {
		limit: 10,
		page: pageParam,
	};

	// console.log({ pageParam });

	const res = await api.get('/posts/', params);

	if (res) {
		return res.data;
	}

	return null;
};
export const useInfiniteFeed = () => {
	return {
		...useInfiniteQuery(['posts'], fetchPosts, {
			getNextPageParam: (lastPage) => {
				// console.log({ lastPage });
				const nextPage = lastPage.data.page + 1;
				return lastPage.data.data.length < 10 ? undefined : nextPage;
			},
			staleTime: 5 * 60 * 1000,
		}),
	};
};

export const createPost = async (body = {}) => {
	const res = await api.post('/posts/', body);
	return res;
};
