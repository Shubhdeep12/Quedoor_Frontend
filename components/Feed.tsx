'use client';

import NoPost from '@/assets/icons/NoPost';
import Text from '@/ui/Text';
import { useInfiniteFeed } from '@/queries/feed';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from './PostCard';
import { PostProps } from '@/lib/constants';
import { Skeleton } from '@/ui/skeleton';
import clsx from 'clsx';
import { useState } from 'react';

const EmptyContainer = () => (
	<div className='empty-container w-full h-[calc(100vh-112px)] flex flex-col justify-center items-center'>
		<div className='flex flex-col items-center gap-2'>
			<NoPost />
			<Text className='text-sm font-semibold text-gray-500'>No Post available.</Text>
			<Text className='text-sm font-semibold text-gray-500'>Either create a post or follow users.</Text>
		</div>
	</div>
);

const PostSkeletonLoader = () => (
	<div className='flex flex-col gap-6 w-full items-center'>
		{Array(5)
			.fill(1)
			.map((e) => (
				<div key={e} className='flex flex-col gap-4 p-8 rounded-3xl w-full max-w-[700px]'>
					<div className='flex items-center gap-4 w-full'>
						<Skeleton className='rounded-full h-10 w-10' />
						<div className='flex flex-col gap-2 w-full'>
							<Skeleton className='rounded-lg h-2 w-full ' />
							<Skeleton className='rounded-lg h-2 w-full' />
						</div>
					</div>
					<Skeleton className='rounded-lg h-3 w-full' />
					<Skeleton className='rounded-lg h-3 w-full' />
					<Skeleton className='h-36 w-full' />
				</div>
			))}
	</div>
);

const feedTypes = [
	{
		id: 'popular',
		title: 'Popular',
	},
	{
		id: 'following',
		title: 'Following',
	},
];

const Feed = () => {
	const [activeFeedType, setActiveFeedType] = useState('following');
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteFeed();

	const isEmpty = () =>
		data?.pages.every((page: any) => {
			return page.data && Array.isArray(page.data) && page.data.length === 0;
		});
	return (
		<>
			<div className='pb-4 pt-10 flex justify-between items-end bg-white w-[700px] fixed z-10'>
				<Text className='text-3xl font-black'>Feeds</Text>
				<div className='flex items-center gap-4'>
					{!isEmpty() &&
						feedTypes.map((type) => (
							<Text
								key={type.id}
								onClick={() => setActiveFeedType(type.id)}
								className={clsx(
									activeFeedType === type.id ? 'text-black' : 'text-gray-400',
									'text-base font-semibold cursor-pointer transition'
								)}
							>
								{type.title}
							</Text>
						))}
				</div>
			</div>

			<div className='flex w-[700px] justify-between my-28'>
				<InfiniteScroll
					next={fetchNextPage}
					hasMore={hasNextPage || false}
					className='!w-full'
					scrollableTarget='feedscrollable'
					loader={(isLoading || isFetchingNextPage) && <PostSkeletonLoader />}
					dataLength={data?.pages.length || 0}
				>
					{isLoading ? (
						<PostSkeletonLoader />
					) : isEmpty() ? (
						<EmptyContainer />
					) : (
						<div className='flex flex-col gap-6 w-full'>
							{data?.pages.map((page) =>
								page.data.map((post: PostProps) => <PostCard key={JSON.stringify(post)} post={post} />)
							)}
						</div>
					)}
				</InfiniteScroll>
			</div>
		</>
	);
};
export default Feed;
