'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import PageLoader from '@/components/PageLoader';
import Text from '@/ui/Text';
import { Button } from '@/ui/button';
import { logout } from '@/queries/auth';
import { useToast } from '@/ui/use-toast';
import { clearItem, removeCookie } from '@/lib/misc';

const Home = () => {
	const router = useRouter();
	const { user } = useAuth();
	const { toast } = useToast();

	useEffect(() => {
		if (!(user && user.id)) {
			router.push('/login');
		}
	}, [user, router]);

	if (!user) {
		return <PageLoader />;
	}

	const handleLogout = async (e: any) => {
		e.preventDefault();
		const res = await logout();
		if (res.status < 300) {
			toast({
				title: 'Logged out successfully.',
			});
			clearItem('quedoor-token');
			removeCookie('quedoor-token');
			window.location.pathname = '/login';
		} else {
			toast({
				title: 'Failed to logout! Please try again.',
				variant: 'destructive',
			});
		}
	};

	return (
		<>
			<div className='pb-4 pt-10 flex justify-between items-center bg-white w-[700px] fixed z-10'>
				<Text className='text-3xl font-black'>Settings</Text>
			</div>

			<div className='my-28'>
				<Button onClick={handleLogout}>Log out</Button>
			</div>
		</>
	);
};

export default Home;
