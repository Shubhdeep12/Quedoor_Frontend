'use client';

import { CommentProps } from '@/lib/constants';
import { Skeleton } from '@/ui/skeleton';
import clsx from 'clsx';
import { memo, useState } from 'react';
import CreateComment from './CreateComment';
import CommentCard from './CommentCard';
import { useFetchComments } from '@/queries/feed';

const Comments = ({ isCommentsOpen, post }: any) => {
	const [payload, setPayload] = useState({
		limit: 3,
		page: 1,
	});
	const [showAllComments, setShowAllComments] = useState(false);

	const { isFetching, data: comments } = useFetchComments({ postId: post._id, payload });

	console.log(comments, isFetching);

	const handleShowAllComments = () => {
		setShowAllComments(true);
		setPayload({
			limit: comments.totalRecords,
			page: 1,
		});
	};
	return (
		<div
			className={clsx(
				isCommentsOpen ? `h-auto` : 'h-0 overflow-hidden',
				' w-full transition-all duration-200 ease-in-out mt-2 flex flex-col gap-4'
			)}
		>
			<CreateComment post={post} />

			<div className='flex flex-col gap-2 overflow-auto'>
				{/* {isFetching
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
					: */}
				{comments?.data.map((comment: CommentProps) => <CommentCard key={comment._id} comment={comment} post={post} />)}
			</div>

			{!showAllComments &&
				isCommentsOpen &&
				comments?.data &&
				comments.data.length > 0 &&
				comments.totalRecords > 3 && (
					<div onClick={handleShowAllComments} className='cursor-pointer'>
						show all comments
					</div>
				)}
		</div>
	);
};

export default memo(Comments);
