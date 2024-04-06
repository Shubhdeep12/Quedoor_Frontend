import api from '@/lib/api';
import { CommentProps, PostProps } from '@/lib/constants';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
				const nextPage = lastPage?.page + 1;
				return lastPage?.data?.length < 10 ? undefined : nextPage;
			},
			staleTime: 5000,
		}),
	};
};

export const createPost = async (body: object) => {
	const res = await api.post('/posts/', body);
	return res;
};

export const updatePost = async ({ id, body }: { id: number; body: object }) => {
	const res = await api.put(`/posts/${id}`, body);
	return res;
};

export const deletePost = async (id: number) => {
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
				let updatedData = { ...prevData };
				updatedData = {
					...updatedData,
					pages: updatedData.pages.map((page: any) => ({
						...page,
						data: page.data.map((post: any) => {
							if (post.id === updatedPost.result.id) {
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
		onError: () => {},
	});
};

export const useDeletePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deletePost,
		onSuccess: async (_, id: number) => {
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
							if (post.id === id) {
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

export const likePost = async ({ postId, body, userId }: { postId: number; body: any; userId: number }) => {
	const res = await api.post(`/posts/${postId}/like`, body);
	return { ...res, postId, liked: body.like, userId };
};

export const useLikePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: likePost,
		onSuccess: async (result: { status: number; postId: number; liked: boolean; userId: number }) => {
			const queryKey = ['posts'];
			const prevData: any = queryClient.getQueryData(queryKey);

			if (prevData && prevData.pages && prevData.pages[0]) {
				// Append the new post to the existing data
				let updatedData = { ...prevData };
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				updatedData = {
					...updatedData,
					pages: updatedData.pages.map((page: any) => ({
						...page,
						data: page.data.map((post: any) => {
							if (post.id === result.postId) {
								const _prevPost = { ...post };
								_prevPost.isLiked = result.status < 300 && result.liked;
								if (_prevPost.isLiked) {
									const reactions = new Set(_prevPost.reactions);
									reactions.add(result.userId);
									_prevPost.reactions = [...reactions];
								} else {
									const reactions = _prevPost.reactions.filter((id: number) => id !== result.userId);
									_prevPost.reactions = reactions;
								}
								return _prevPost;
							}
							return post;
						}),
					})),
				};

				// FIXME: on setting this component re-renders and changes its color and have blinkering effect
				// queryClient.setQueryData(queryKey, updatedData);
			}
		},
		onError: () => {},
	});
};

export const fetchCommentsAPI = async ({ postId, limit = 3, page = 1 }: any) => {
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

export const useFetchComments = (postId: number) => {
	const queryClient = useQueryClient();
	const fetchCommentsQuery = useQuery({
		queryKey: ['comment', postId],
		queryFn: (payload: any) => fetchCommentsAPI({ postId, ...payload }),
	});

	const fetchComments = async (payload: any) => {
		const updatedComments = await fetchCommentsAPI({ postId, ...payload });
		queryClient.setQueryData(['comment', postId], updatedComments);
		return updatedComments;
	};
	return {
		...fetchCommentsQuery,
		fetchComments,
	};
};

export const createComment = async ({ postId, body }: { postId: number; body: object }) => {
	const res = await api.post(`/posts/${postId}/comment/`, body);
	return res;
};

export const updateComment = async ({ id, body }: { id: number; body: object }) => {
	const res = await api.put(`/comments/${id}`, body);
	return res;
};

export const deleteComment = async (id: number) => {
	const res = await api.delete(`/comments/${id}`);
	return res.status < 300 ? true : false;
};

export const useUpdateComment = (postId: number) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateComment,
		onSuccess: async (updatedComment: { result: CommentProps }) => {
			const queryKey = ['comment', postId];
			const prevData: any = queryClient.getQueryData(queryKey);

			if (prevData && prevData.data && prevData.data.length > 0) {
				// Append the new comment to the existing data
				let updatedData = { ...prevData };
				updatedData = {
					...updatedData,
					data: updatedData.data.map((comment: any) => {
						if (comment.id === updatedComment.result.id) {
							return updatedComment.result;
						}
						return comment;
					}),
				};
				queryClient.setQueryData(queryKey, updatedData);
			}
		},
		onError: () => {},
	});
};

export const useCreateComment = (postId: number) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createComment,
		onSuccess: async (newComment: { result: CommentProps }) => {
			const queryKey = ['comment', postId];
			const prevData: any = queryClient.getQueryData(queryKey);

			if (prevData && prevData.data && prevData.data.length > 0) {
				// Append the new comment to the existing data
				const updatedData = { ...prevData };
				updatedData.data = [newComment.result, ...updatedData.data];
				queryClient.setQueryData(queryKey, updatedData);
			} else {
				queryClient.setQueryData(queryKey, { data: [newComment.result] });
			}
		},
		onError: () => {},
	});
};

export const useDeleteComment = (postId: number) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteComment,
		onSuccess: async (_, id: number) => {
			const queryKey = ['comment', postId];
			const prevData: any = queryClient.getQueryData(queryKey);

			if (prevData && prevData.data && prevData.data.length > 0) {
				// Append the new comment to the existing data
				let updatedData = { ...prevData };
				updatedData = {
					...updatedData,
					data: updatedData.data.filter((comment: any) => {
						if (comment.id === id) {
							return false;
						}
						return true;
					}),
				};
				queryClient.setQueryData(queryKey, updatedData);
			}
		},
		onError: () => {},
	});
};

const fetchFilterPosts = async (pageParam = 1, filter: any) => {
	const params = {
		limit: 10,
		page: pageParam,
	};

	const data = new FormData();
	data.append('description', filter.description);
	if (filter.file) {
		data.append('image', filter.file);
	}
	const res = await api.post('/filter/posts', data, params);

	if (res) {
		return res.result;
	}
	return null;
};

export const useFilteredInfiniteFeed = (filter: any) => {
	const fetchFilteredPostsQuery = {
		...useInfiniteQuery({
			queryKey: ['filteredposts', filter],
			queryFn: ({ pageParam }) => fetchFilterPosts(pageParam, filter),
			initialPageParam: 1,
			getNextPageParam: (lastPage) => {
				const nextPage = lastPage?.page + 1;
				return lastPage?.data?.length < 10 ? undefined : nextPage;
			},
			staleTime: 5000,

			enabled: !!filter,
		}),
	};
	return {
		...fetchFilteredPostsQuery,
	};
};
