import api from '@/lib/api';
import { PostProps } from '@/lib/constants';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchPosts = async (pageParam = 1) => {
	const params = {
		limit: 10,
		page: pageParam,
	};
	const res = await api.get('/posts/', params);
	if (res) {
		return res.data.result;
	}
	return null;
};
export const useInfiniteFeed = () => {
	return {
		...useInfiniteQuery({
			queryKey: ['posts'],
			queryFn: ({ pageParam }) => fetchPosts(pageParam),
			initialPageParam: 1,
			getNextPageParam: (lastPage) => {
				const nextPage = lastPage.page + 1;
				return lastPage.data.length < 10 ? undefined : nextPage;
			},
			staleTime: 5000
			})
	};
};

export const createPost = async (body: object) => {
	const res = await api.post('/posts/', body);
	return res;
};

export const updatePost = async ({ id, body }: { id: string; body: object }) => {
	const res = await api.put(`/posts/${id}`, body);
	return res;
};

export const deletePost = async (id: string) => {
	const res = await api.delete(`/posts/${id}`);
	return res;
};

export const useUpdatePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updatePost,
		onSuccess: async (updatedPost: { result: PostProps }) => {
			const queryKey = ['posts'];
			const prevData: any = queryClient.getQueryData(queryKey);

			if (prevData && prevData.pages && prevData.pages[0]) {
				// Append the new post to the existing data
				let updatedData = { ...prevData };
				updatedData = {
					...updatedData,
					pages: updatedData.pages.map((page: any) => ({
						...page,
						data: page.data.map((post: any) => {
							if (post._id === updatedPost.result._id) {
								return updatedPost.result;
							}
							return post;
						}),
					})),
				};
				queryClient.setQueryData(queryKey, updatedData);
			}
		},
		onError: () => {},
	});
};

export const useCreatePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createPost,
		onSuccess: async (newPost: { result: PostProps }) => {
			const queryKey = ['posts'];
			const prevData: any = queryClient.getQueryData(queryKey);

			if (prevData && prevData.pages && prevData.pages[0]) {
				// Append the new post to the existing data
				const updatedData = { ...prevData };
				updatedData.pages[0].data = [newPost.result, ...updatedData.pages[0].data];
				queryClient.setQueryData(queryKey, updatedData);
			} else {
				queryClient.setQueryData(queryKey, { pages: [{ data: [newPost.result] }] });
			}
		},
		onError: () => {
			// Revert the optimistic update if there's an error
		},
	});
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deletePost,
		onSuccess: async (_, id: string) => {
			const queryKey = ['posts'];
			const prevData: any = queryClient.getQueryData(queryKey);

			if (prevData && prevData.pages && prevData.pages[0]) {
				// Append the new post to the existing data
				let updatedData = { ...prevData };
				updatedData = {
					...updatedData,
					pages: updatedData.pages.map((page: any) => ({
						...page,
						data: page.data.filter((post: any) => {
							if (post._id === id) {
								return false;
							}
							return true;
						}),
					})),
				};

				queryClient.setQueryData(queryKey, updatedData);
			}
		},
		onError: () => {},
	});
};

export const likePost = async (postId: string, body: object) => {
	const res = await api.post(`/posts/${postId}/like`, body);
	return res;
};

export const fetchComments = async ({ postId, limit = 3, page = 1 }: any) => {
	const params = {
		limit,
		page,
	};
	const res = await api.get(`/posts/${postId}/comments/`, params);
	if (res) {
		return res.data.result;
	}
	return null;
};

export const createComment = async (postId: string, body: object) => {
	const res = await api.post(`/posts/${postId}/comment/`, body);
	return res;
};

export const updateComment = async ({ id, body }: { id: string; body: object }) => {
	const res = await api.put(`/comments/${id}`, body);
	return res;
};

export const deleteComment = async (id: string) => {
	const res = await api.delete(`/comments/${id}`);
	return res;
};
