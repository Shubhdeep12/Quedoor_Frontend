'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import PageLoader from '@/components/PageLoader';
import Sidebar from '@/components/Sidebar';
import Feed from '@/components/Feed';

const Home = () => {
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
			<div className='flex gap-12 h-[100vh]'>
				<Sidebar />
				<Feed />
			</div>
		</>
	);
};

export default Home;
