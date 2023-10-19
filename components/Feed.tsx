'use client';

import NoPost from '@/assets/icons/NoPost';
import Text from '@/components/Text';
import { useInfiniteFeed } from '@/queries/feed';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from './PostCard';

const EmptyContainer = () => (
	<div className='empty-container w-[630px] h-full flex items-center'>
		<div className='flex flex-col items-center gap-2'>
			<NoPost />
			<Text className='text-sm font-semibold text-gray-500'>No Post available.</Text>
			<Text className='text-sm font-semibold text-gray-500'>Either create a post or follow users.</Text>
		</div>
	</div>
);

const MainSection = () => {
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteFeed();

	// console.log({ data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage });

	return (
		<div
			id='feed-scrollable'
			className='main-section flex-1 ml-[calc(20%+80px)] h-full flex w-full gap-10 overflow-auto'
		>
			<InfiniteScroll
				next={fetchNextPage}
				hasMore={hasNextPage || false}
				className='!w-full'
				loader={<Text>Loading...</Text>}
				scrollableTarget='feed-scrollable'
				dataLength={data?.pages.reduce((total, page) => total + page.length, 0) || 0}
			>
				{(!data?.pages[0] || data?.pages[0].data.data.length === 0) && <EmptyContainer />}
				<div className='flex flex-col gap-6 w-full items-center p-6'>
					{data?.pages.map((page) => page.data.data.map((post: any) => <PostCard key={post.id} post={post} />))}
				</div>
			</InfiniteScroll>

			<div className='h-screen w-60'>aa</div>
		</div>
	);
};
export default MainSection;
