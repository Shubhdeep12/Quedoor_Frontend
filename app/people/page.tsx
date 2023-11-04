'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import PageLoader from '@/components/PageLoader';
import Text from '@/ui/Text';
import api from '@/lib/api';

const People = () => {
	const router = useRouter();
	const { user } = useAuth();

	const fetchUsers = async () => {
		const res = await api.get('/users');
		console.log({ res });
	};

	useEffect(() => {
		if (!(user && user.id)) {
			router.push('/login');
		}
	}, [user, router]);

	useEffect(() => {
		fetchUsers();
	}, []);

	if (!user) {
		return <PageLoader />;
	}

	return (
		<>
			<div className='pb-4 pt-10 flex justify-between items-center bg-white w-[700px] fixed z-10'>
				<Text className='text-3xl font-black'>People</Text>
			</div>

			<div className='mt-28'>Coming soon...</div>
		</>
	);
};

export default People;
