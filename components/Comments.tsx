'use client';

import { CommentProps } from '@/lib/constants';
import { fetchComments } from '@/queries/feed';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Dialog, DialogTrigger } from '@/ui/dialog';
import { Skeleton } from '@/ui/skeleton';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import CreateComment from './CreateComment';
import { Button } from '@/ui/button';
import Text from '@/ui/Text';

const Comments = ({ isCommentsOpen, post }: any) => {
	const [isLoading, setIsLoading] = useState(false);
	const [comments, setComments] = useState<CommentProps[]>([]);
	const [showAllComments, setShowAllComments] = useState(false);
	const [totalComments, setTotalComments] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

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
			<div className='flex gap-2 items-center'>
				<Avatar className='w-10 h-10'>
					<AvatarImage src={post?.creator?.profile_img} />
					<AvatarFallback className='text-sm'>
						{post?.creator.name
							.match(/(\b\S)?/g)
							.join('')
							.match(/(^\S|\S$)?/g)
							.join('')
							.toUpperCase()}
					</AvatarFallback>
				</Avatar>

				<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
					<DialogTrigger asChild onClick={() => setIsModalOpen(true)}>
						<Button
							variant='outline'
							className='flex justify-start hover:bg-neutral-100 dark:hover:bg-neutral-50 cursor-pointer transition-all w-full rounded-md py-2 px-5'
						>
							<Text className='text-sm'>Add a comment...</Text>
						</Button>
					</DialogTrigger>

					<CreateComment post={post} setComments={setComments} onClose={() => setIsModalOpen(false)} />
				</Dialog>
			</div>

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
					: comments.map((comment: CommentProps) => <div key={comment?._id}>{comment?.description}</div>)}
			</div>

			{!showAllComments && isCommentsOpen && comments && comments.length > 0 && totalComments > 3 && (
				<div onClick={() => setShowAllComments(true)}>show all comments</div>
			)}
		</div>
	);
};

export default Comments;
