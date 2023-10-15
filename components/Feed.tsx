'use client';

import NoPost from '@/assets/icons/NoPost';
import Text from '@/components/Text';
import { useInfiniteFeed } from '@/queries/feed';
import { useState } from 'react';

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
	const [feed, setFeed] = useState([]);

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteFeed(feed, setFeed);

	console.log({ data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage });

	return (
		<div className='main-section flex-1 ml-[calc(20%+80px)] h-full flex flex-col items-end gap-10'>
			{!data?.pages[0] || data?.pages[0].data.data.data.length === 0}
			{<EmptyContainer />}
		</div>
	);
};
export default MainSection;
