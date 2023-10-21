'use client';

import { useRouter } from 'next/navigation';
import Feed from '../ui/Feed';
import Sidebar from '../ui/Sidebar';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import PageLoader from '@/ui/PageLoader';
import { useDisclosure } from '@chakra-ui/react';
import CreatePost from '@/ui/CreatePost';

const Home = () => {
	const router = useRouter();
	const { user } = useAuth();

	const { isOpen, onOpen, onClose } = useDisclosure();

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
			<div className='flex gap-10 h-[calc(100vh-65px)]'>
				<Sidebar onCreate={onOpen} />
				<Feed />
			</div>

			<CreatePost isOpen={isOpen} onClose={onClose} />
		</>
	);
};

export default Home;
