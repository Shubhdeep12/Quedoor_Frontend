'use client';

import NoPost from '@/assets/icons/NoPost';
import Text from '@/ui/Text';
import { useInfiniteFeed } from '@/queries/feed';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from './PostCard';
const EmptyContainer = () => (
	<div className='empty-container w-full h-[calc(100vh-85px)]  flex flex-col justify-center items-center'>
		<div className='flex flex-col items-center gap-2'>
			<NoPost />
			<Text className='text-sm font-semibold text-gray-500'>No Post available.</Text>
			<Text className='text-sm font-semibold text-gray-500'>Either create a post or follow users.</Text>
		</div>
	</div>
);

const Feed = () => {
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteFeed();

	return (
		<div
			id='feedscrollable'
			className='main-section flex-1 
		//ml-[calc(20%+80px)]
		flex w-full gap-10 overflow-scroll'
		>
			<InfiniteScroll
				next={fetchNextPage}
				hasMore={hasNextPage || false}
				className='!w-full'
				scrollableTarget='feedscrollable'
				loader={(isLoading || isFetchingNextPage) && <Text>Loading...</Text>}
				dataLength={data?.pages.length || 0}
			>
				{data?.pages.every((page: any) => {
					return page.data && Array.isArray(page.data) && page.data.length === 0;
				}) ? (
					<EmptyContainer />
				) : (
					<div className='flex flex-col gap-6 w-full items-center p-6'>
						{data?.pages.map((page) =>
							page.data.map((post: any) => <PostCard key={JSON.stringify(post)} post={post} />)
						)}
					</div>
				)}
			</InfiniteScroll>
		</div>
	);
};
export default Feed;
