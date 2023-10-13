'use client';

import NoPost from '@/assets/icons/NoPost';
import Text from '@/components/Text';
// import api from '@/utils/api';
// import { useInfiniteQuery } from '@tanstack/react-query';

// async function getPokemons({ pageParam = 0 }) {
// 	const res = await api.get(`https://pokeapi.co/api/v2/ability?limit=20&offset=${pageParam}`);
// 	console.log({ res });
// 	if (!res.ok) {
// 		// This will activate the closest `error.js` Error Boundary
// 		throw new Error('Failed to fetch data');
// 	}
// 	const data = await res.json();
// 	const filtered = await data.results.map((pokemon: any, index: any) => {
// 		const paddedIndex = pageParam === 0 ? ('00' + (index + 1)).slice(-3) : '00' + (index + 1);
// 		const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;
// 		return {
// 			...pokemon,
// 			imageUrl: image,
// 		};
// 	});
// 	return filtered;
// }

const MainSection = () => {
	// const {
	// 	data: pokemons,
	// 	error,
	// 	pageParams,
	// 	fetchNextPage,
	// 	hasNextPage,
	// 	isFetching,
	// 	isFetchingNextPage,
	// 	status,
	// } = useInfiniteQuery({
	// 	queryKey: ['pokemons'],
	// 	queryFn: getPokemons,
	// 	getNextPageParam: (lastPage, allPages) => {
	// 		const nextPage = lastPage.length === 20 ? allPages.length * 20 : undefined;
	// 		return nextPage;
	// 	},
	// });

	const EmptyContainer = () => (
		<div className='empty-container w-[630px] h-full flex items-center'>
			<div className='flex flex-col items-center gap-2'>
				<NoPost />
				<Text className='text-sm font-semibold text-gray-500'>No Post available.</Text>
				<Text className='text-sm font-semibold text-gray-500'>Either create a post or follow users.</Text>
			</div>
		</div>
	);
	return (
		<div className='main-section flex-1 ml-[calc(20%+80px)] h-full flex flex-col items-end gap-10'>
			{/* <div className='w-full md:w-10/12 m-auto flex mt-5 mb-5 flex-col md:grid md:grid-cols-3 md:grid-row-1 md:items-center gap-4'>
				{pokemons?.pages?.map((page) => page.map((pokemon: any, index: any) => <div>{pokemon?.name}</div>))}
			</div>
			<button
				className='rounded-full mt-3 border-2 border-blue-400 py-1 px-8 bg-yellow-300 cursor-pointer shadow-lg'
				onClick={() => fetchNextPage()}
			>
				{isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
			</button> */}

			<EmptyContainer />
		</div>
	);
};
export default MainSection;
