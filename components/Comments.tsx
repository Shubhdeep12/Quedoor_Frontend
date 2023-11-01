'use client';

import { CommentProps } from '@/lib/constants';
import { fetchComments } from '@/queries/feed';
import { Skeleton } from '@/ui/skeleton';
import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import CreateComment from './CreateComment';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import Text from '@/ui/Text';
import { getRelativeTime } from '@/lib/misc';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import useAuth from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogTrigger } from '@/ui/dialog';
import Image from 'next/image';

const Comments = ({ isCommentsOpen, post }: any) => {
	const commentOptions = [
		{
			key: 'update',
			action: () => {},
			value: 'Update Comment',
		},
		{
			key: 'delete',
			action: () => {
				// setAlert({
				// 	isOpen: true,
				// 	header: 'Are you absolutely sure?',
				// 	description:
				// 		'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
				// 	action: () => {
				// 		deletePostMutation.mutate(post._id);
				// 	},
				// });
			},
			value: 'Delete Comment',
		},
	];
	const { user } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [comments, setComments] = useState<CommentProps[]>([]);
	const [showAllComments, setShowAllComments] = useState(false);
	const [totalComments, setTotalComments] = useState(0);

	const getComments = async () => {
		const { data, totalRecords } = await fetchComments({
			postId: post?._id,
			limit: showAllComments ? totalComments : 3,
		});
		if (data && totalRecords) {
			setComments(data);
			setTotalComments(totalRecords);
		}
	};

	useEffect(() => {
		if (isCommentsOpen) {
			setIsLoading(true);
			getComments();
			setIsLoading(false);
		}
		if (!isCommentsOpen) setShowAllComments(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCommentsOpen, showAllComments]);

	return (
		<div
			className={clsx(
				isCommentsOpen ? `h-auto` : 'h-0 overflow-hidden',
				' w-full transition-all duration-200 ease-in-out mt-2 flex flex-col gap-4'
			)}
		>
			<CreateComment post={post} setComments={setComments} />

			<div className='flex flex-col gap-2 overflow-auto'>
				{isLoading
					? Array(2)
							.fill(1)
							.map((e) => (
								<div key={e} className='flex flex-col gap-2 w-full rounded-md p-2'>
									<div className='flex items-center gap-4 w-full'>
										<Skeleton className='rounded-full h-8 w-8' />
										<div className='flex flex-col gap-2 w-full'>
											<Skeleton className='rounded-lg h-2 w-full ' />
											<Skeleton className='rounded-lg h-2 w-full' />
										</div>
									</div>
									<Skeleton className='rounded-lg h-8 w-full' />
								</div>
							))
					: comments.map((comment: CommentProps) => (
							<div key={comment?._id} className='w-full border p-4 rounded-md flex flex-col gap-4'>
								<div className='comment-header flex items-center gap-4'>
									<Avatar className='w-6 h-6'>
										<AvatarImage src={comment?.creator?.profile_img} />
										<AvatarFallback className='text-xs'>
											{comment.creator.name
												.match(/(\b\S)?/g)
												.join('')
												.match(/(^\S|\S$)?/g)
												.join('')
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className='flex flex-col gap-1 flex-1'>
										<Text className='font-bold text-xs'>{comment?.creator?.name}</Text>
										<Text className='text-neutral-500 text-[10px]'>{getRelativeTime(comment?.updated_at)}</Text>
									</div>

									{user.id == comment?.userId && (
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<button>
													<IoEllipsisHorizontalSharp size={14} />
												</button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className='w-auto overflow-hidden mx-2 p-0 rounded-xl'>
												{commentOptions.map((option) => (
													<DropdownMenuItem
														key={option.key}
														className='px-6 py-3 border-b cursor-pointer'
														onClick={option.action}
													>
														{option.value}
													</DropdownMenuItem>
												))}
											</DropdownMenuContent>
										</DropdownMenu>
									)}
								</div>

								{comment.description && (
									<div className='bg-neutral-200 rounded-md p-2'>
										<Text className='text-xs '>{comment.description}</Text>
									</div>
								)}

								{comment.image_url && (
									<Dialog>
										<DialogTrigger asChild>
											<div className='w-fit rounded-md p-2'>
												<Image
													objectFit='contain'
													layout='fill'
													className='!w-[100px] !h-fit rounded-lg !relative'
													alt='img'
													src={String(comment.image_url)}
												/>
											</div>
										</DialogTrigger>
										<DialogContent className='laptop:max-w-[800px]'>
											<Image
												objectFit='contain'
												layout='fill'
												className='!w-full !h-full !relative mt-2'
												alt='img'
												src={String(comment.image_url)}
											/>
										</DialogContent>
									</Dialog>
								)}
							</div>
					  ))}
			</div>

			{!showAllComments && isCommentsOpen && comments && comments.length > 0 && totalComments > 3 && (
				<div onClick={() => setShowAllComments(true)}>show all comments</div>
			)}
		</div>
	);
};

export default memo(Comments);
