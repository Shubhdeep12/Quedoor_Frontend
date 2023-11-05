'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import PageLoader from '@/components/PageLoader';
import Text from '@/ui/Text';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFilteredInfiniteFeed } from '@/queries/feed';
import NoPost from '@/assets/icons/NoPost';
import { Skeleton } from '@/ui/skeleton';
import { PostProps } from '@/lib/constants';
import PostCard from '@/components/PostCard';
import { Button } from '@/ui/button';
import { Dialog, DialogTrigger } from '@/ui/dialog';
import FilterPost from '@/components/FilterPost';
import clsx from 'clsx';

const EmptyContainer = () => (
	<div className='empty-container w-full h-[calc(100vh-112px)] flex flex-col justify-center items-center'>
		<div className='flex flex-col items-center gap-2'>
			<NoPost />
			<Text className='text-sm font-semibold text-gray-500'>No Post available.</Text>
			<Text className='text-sm font-semibold text-gray-500'>Apply the filter or Edit the filter applied.</Text>
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

const Search = () => {
	const router = useRouter();
	const { user } = useAuth();
	const [filter, setFilter] = useState<any>(null);
	const [showFilterPostModal, setShowFilterPostModal] = useState(false);
	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useFilteredInfiniteFeed(filter);
	console.log(data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage);

	const isFilterApplied = () => filter !== null;

	const isEmpty = () =>
		!data ||
		data?.pages.length === 0 ||
		data?.pages.every((page: any) => {
			return page.data && Array.isArray(page.data) && page.data.length === 0;
		});

	const handleModalReset = (val: any) => {
		setShowFilterPostModal(val);
	};
	useEffect(() => {
		if (!(user && user.id)) {
			router.push('/login');
		}
	}, [user, router]);

	if (!user) {
		return <PageLoader />;
	}

	return (
		<>
			<div className='pb-4 pt-10 flex justify-between items-center bg-white w-[700px] fixed z-10'>
				<Text className='text-3xl font-black'>Search</Text>

				<Dialog open={showFilterPostModal} onOpenChange={handleModalReset}>
					<DialogTrigger asChild>
						<div className='flex gap-2'>
							<Button
								variant={'destructive'}
								onClick={(e) => {
									setFilter(null);
									e.stopPropagation();
								}}
								className={clsx(isFilterApplied() ? 'w-fit' : 'w-0 p-0 m-0', 'transition-all overflow-hidden')}
							>
								Clear Filter
							</Button>
							<Button onClick={() => setShowFilterPostModal(true)}>
								{isFilterApplied() ? 'Edit Filter' : 'Add Filter'}
							</Button>
						</div>
					</DialogTrigger>
					{showFilterPostModal && (
						<FilterPost filter={filter} setFilter={setFilter} onClose={() => setShowFilterPostModal(false)} />
					)}
				</Dialog>
			</div>

			<div className='flex w-[700px] justify-between mt-28'>
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

export default Search;
