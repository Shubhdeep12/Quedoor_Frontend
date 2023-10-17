'use client';

import NoPost from '@/assets/icons/NoPost';
import Text from '@/components/Text';
import { useInfiniteFeed } from '@/queries/feed';
import InfiniteScroll from 'react-infinite-scroll-component';

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

	console.log({ data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage });

	return (
		<div className='main-section flex-1 ml-[calc(20%+80px)] h-full flex flex-col items-end gap-10 overflow-auto'>
			{(!data?.pages[0] || data?.pages[0].data.data.length === 0) && <EmptyContainer />}
			<InfiniteScroll
				next={fetchNextPage}
				hasMore={hasNextPage || false}
				loader={<Text>Loading...</Text>}
				dataLength={data?.pages.reduce((total, page) => total + page.length, 0) || 0}
			>
				<div className='flex flex-col gap-2'>
					{data?.pages.map((page) =>
						page.data.data.map((product: any, ind: number) => (
							<div style={{ width: '100px', height: '200px' }} key={product.id}>
								{'text'}
								{ind}
							</div>
						))
					)}
				</div>
			</InfiniteScroll>
		</div>
	);
};
export default MainSection;
