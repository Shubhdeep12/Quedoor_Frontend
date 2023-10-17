import api from '@/utils/api';
import { useInfiniteQuery } from '@tanstack/react-query';

const _getPosts = async (params = {}, setFeed: any) => {
	const res = await api.get('/posts/', params);
	if (res.data) {
		setFeed((prev: any) => [...prev, res.data]);
	}
	return res;
};

export const useInfiniteFeed = (feed: any, setFeed: any) => {
	const queryFunction = _getPosts;
	return {
		...useInfiniteQuery({
			queryKey: [],
			queryFn: (context) => queryFunction(context, setFeed),
			getNextPageParam: (lastPage, allPages) => {
				const nextPage = lastPage.length === 20 ? allPages.length * 20 : undefined;
				return nextPage;
			},
			getPreviousPageParam: (currentPage: any) => {
				return currentPage?.data?.result?.paging?.prev;
			},
			staleTime: 5 * 60 * 1000,
		}),
		feed,
	};
};

export const createPost = async (body = {}) => {
	const res = await api.post('/posts/', body);
	return res;
};
