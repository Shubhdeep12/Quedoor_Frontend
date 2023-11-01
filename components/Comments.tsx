'use client';

import { CommentProps } from '@/lib/constants';
import { fetchComments } from '@/queries/feed';
import { Skeleton } from '@/ui/skeleton';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import CreateComment from './CreateComment';

const Comments = ({ isCommentsOpen, post }: any) => {
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
					: comments.map((comment: CommentProps) => <div key={comment?._id}>{comment?.description}</div>)}
			</div>

			{!showAllComments && isCommentsOpen && comments && comments.length > 0 && totalComments > 3 && (
				<div onClick={() => setShowAllComments(true)}>show all comments</div>
			)}
		</div>
	);
};

export default Comments;
