'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import PageLoader from '@/components/PageLoader';
import Text from '@/ui/Text';

const Search = () => {
	const router = useRouter();
	const { user } = useAuth();

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
			</div>

			<div className='mt-28'>Coming soon...</div>
		</>
	);
};

export default Search;
