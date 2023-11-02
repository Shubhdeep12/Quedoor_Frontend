'use client';

import { CommentProps } from '@/lib/constants';
import { Skeleton } from '@/ui/skeleton';
import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import CreateComment from './CreateComment';
import CommentCard from './CommentCard';
import { useFetchComments } from '@/queries/feed';

const Comments = ({ isCommentsOpen, post }: any) => {
	const [payload, setPayload] = useState({
		limit: 3,
		page: 1,
	});
	const [showAllComments, setShowAllComments] = useState(false);
	const [currentActiveComment, setCurrentActiveComment] = useState<string | null>(null);
	const { isFetching, data: comments, fetchComments } = useFetchComments(post._id);
	const handleShowAllComments = () => {
		setShowAllComments(true);
		setPayload({
			limit: comments.totalRecords,
			page: 1,
		});
	};

	useEffect(() => {
		fetchComments(payload);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showAllComments]);

	console.log({ isFetching, comments });
	return (
		<div
			className={clsx(
				isCommentsOpen ? `h-auto` : 'h-0 overflow-hidden',
				' w-full transition-all duration-200 ease-in-out mt-2 flex flex-col gap-4 p-2'
			)}
		>
			<CreateComment post={post} />

			<div className='flex flex-col gap-2 overflow-auto'>
				{isFetching
					? [1, 2, 3].map((e) => (
							<div key={e} className='flex flex-col gap-2 w-full rounded-md'>
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
					: comments?.data.map((comment: CommentProps) => (
							<CommentCard
								key={comment._id}
								isEditMode={currentActiveComment === comment._id}
								setEditMode={(val: string | null) => setCurrentActiveComment(val)}
								comment={comment}
								post={post}
							/>
					  ))}
			</div>

			{!showAllComments &&
				isCommentsOpen &&
				comments?.data &&
				comments.data.length > 0 &&
				comments.totalRecords > 3 && (
					<div onClick={handleShowAllComments} className='cursor-pointer font-semibold'>
						show all comments
					</div>
				)}
		</div>
	);
};

export default memo(Comments);
