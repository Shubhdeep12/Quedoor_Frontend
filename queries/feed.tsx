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
				const nextPage = lastPage.page + 1;
				return lastPage.data.length < 10 ? undefined : nextPage;
			},
			staleTime: 5000,
		}),
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

export const likePost = async ({ postId, body, userId }: { postId: string; body: any; userId: string }) => {
	const res = await api.post(`/posts/${postId}/like`, body);
	return { ...res, postId, liked: body.like, userId };
};

export const useLikePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: likePost,
		onSuccess: async (result: { status: number; postId: string; liked: boolean; userId: string }) => {
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
							if (post._id === result.postId) {
								const _prevPost = { ...post };
								_prevPost.isLiked = result.status < 300 && result.liked;
								if (_prevPost.isLiked) {
									const reactions = new Set(_prevPost.reactions);
									reactions.add(result.userId);
									_prevPost.reactions = [...reactions];
								} else {
									const reactions = _prevPost.reactions.filter((_id: string) => _id !== result.userId);
									_prevPost.reactions = reactions;
								}
								console.log({ _prevPost, result });
								return _prevPost;
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

export const useFetchComments = ({ postId, payload }: any) => {
	return {
		...useQuery({
			queryKey: ['commment', postId, payload],
			queryFn: () => fetchComments({ postId, ...payload }),
		}),
	};
};

export const createComment = async ({ postId, body }: { postId: string; body: object }) => {
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

export const useUpdateComment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateComment,
		onSuccess: async (updatedComment: { result: CommentProps }) => {
			const queryKey = ['comment'];
			const prevData: any = queryClient.getQueryData(queryKey);

			if (prevData && prevData.pages && prevData.pages[0]) {
				// Append the new comment to the existing data
				let updatedData = { ...prevData };
				updatedData = {
					...updatedData,
					pages: updatedData.pages.map((page: any) => ({
						...page,
						data: page.data.map((comment: any) => {
							if (comment._id === updatedComment.result._id) {
								return updatedComment.result;
							}
							return comment;
						}),
					})),
				};
				queryClient.setQueryData(queryKey, updatedData);
			}
		},
		onError: () => {},
	});
};

export const useCreateComment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createComment,
		onSuccess: async (newComment: { result: CommentProps }) => {
			const queryKey = ['comment'];
			const prevData: any = queryClient.getQueryData(queryKey);

			if (prevData && prevData.pages && prevData.pages[0]) {
				// Append the new comment to the existing data
				const updatedData = { ...prevData };
				updatedData.pages[0].data = [newComment.result, ...updatedData.pages[0].data];
				queryClient.setQueryData(queryKey, updatedData);
			} else {
				queryClient.setQueryData(queryKey, { pages: [{ data: [newComment.result] }] });
			}
		},
		onError: () => {
			// Revert the optimistic update if there's an error
		},
	});
};

export const useDeleteComment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteComment,
		onSuccess: async (_, id: string) => {
			const queryKey = ['comment'];
			const prevData: any = queryClient.getQueryData(queryKey);

			if (prevData && prevData.pages && prevData.pages[0]) {
				// Append the new comment to the existing data
				let updatedData = { ...prevData };
				updatedData = {
					...updatedData,
					pages: updatedData.pages.map((page: any) => ({
						...page,
						data: page.data.filter((comment: any) => {
							if (comment._id === id) {
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
