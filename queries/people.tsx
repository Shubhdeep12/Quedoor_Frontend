import api from '@/lib/api';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchPeople = async (pageParam = 1) => {
	const params = {
		limit: 20,
		page: pageParam,
	};
	const res = await api.get('/users', params);
	if (res) {
		return res.data.result;
	}
	return null;
};

export const useInfinitePeopleList = () => {
	return {
		...useInfiniteQuery({
			queryKey: ['people'],
			queryFn: ({ pageParam }) => fetchPeople(pageParam),
			initialPageParam: 1,
			getNextPageParam: (lastPage) => {
				const nextPage = lastPage.page + 1;
				return lastPage.data.length < 10 ? undefined : nextPage;
			},
			staleTime: 5000,
		}),
	};
};
