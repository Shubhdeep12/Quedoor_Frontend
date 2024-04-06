'use client';

import Text from '@/ui/Text';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Dialog, DialogTrigger } from '@/ui/dialog';
import CreatePost from './CreatePost';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaPager, FaUserFriends } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { BiSolidUserCircle } from 'react-icons/bi';
import { RiSearchEyeLine } from 'react-icons/ri';
import Link from 'next/link';

const Sidebar = () => {
	const { user } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	const [showPostModal, setShowPostModal] = useState(false);
	const [activeTab, setActiveTab] = useState('feed');

	const handleModalReset = (val: any) => {
		setShowPostModal(val);
	};

	useEffect(() => {
		if (pathname.startsWith('/profile')) setActiveTab('profile');
		else if (pathname.startsWith('/people')) setActiveTab('people');
		else if (pathname.startsWith('/settings')) setActiveTab('settings');
		else if (pathname.startsWith('/search')) setActiveTab('search');
		else setActiveTab('feed');
	}, [pathname]);

	const sidebarOptions = [
		{
			id: 'feed',
			title: 'Feed',
			icon: FaPager,
			route: '/',
		},
		{
			id: 'search',
			title: 'Search',
			icon: RiSearchEyeLine,
			route: '/search',
		},
		{
			id: 'people',
			title: 'People',
			icon: FaUserFriends,
			route: '/people',
		},
		{
			id: 'profile',
			title: 'Profile',
			icon: BiSolidUserCircle,
			route: '/profile',
		},
		{
			id: 'settings',
			title: 'Settings',
			icon: AiFillSetting,
			route: '/settings',
		},
	];

	if (pathname.startsWith('/login') || !user) {
		return null;
	}

	return (
		<header className={cn('left-section w-[40%] h-screen sticky flex flex-col')}>
			<div className='p-10 flex flex-col gap-10 items-center w-80 self-end'>
				<div className='flex flex-col w-full gap-2 items-center'>
					<Avatar className='w-24 h-24'>
						<AvatarImage src={user?.profileImg} />
						<AvatarFallback className='text-2xl font-bold'>
							{user?.name
								?.match(/(\b\S)?/g)
								?.join('')
								?.match(/(^\S|\S$)?/g)
								?.join('')
								.toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<Text className='font-semibold text-sm'>{user.name}</Text>
					<Text className='font-semibold text-sm text-gray-500 -mt-1'>{user.email}</Text>
				</div>

				<div className='flex flex-col w-full items-center gap-4'>
					{sidebarOptions.map(({ id, title, icon: Icon, route }) => (
						<Link
							key={id}
							href={route}
							className={cn(
								activeTab === id ? 'bg-black' : 'bg-transparent hover:bg-gray-200',
								'transition p-3 rounded-2xl w-full justify-start flex gap-3 cursor-pointer'
							)}
						>
							<Icon size={24} className={cn(activeTab === id ? '!fill-gray-100' : '!fill-black')} />
							<Text className={cn(activeTab === id ? 'text-gray-100' : 'text-black', 'text-base font-semibold ')}>
								{title}
							</Text>
						</Link>
					))}
				</div>

				<Dialog open={showPostModal} onOpenChange={handleModalReset}>
					<DialogTrigger asChild>
						<Button
							className='w-full flex h-fit py-3 px-4 rounded-full items-center gap-1 flex-1 bg-gradient-to-bl from-blue-400 to-red-400'
							onClick={() => setShowPostModal(true)}
						>
							<Text className='font-bold text-xl'>{'Create Post'}</Text>
						</Button>
					</DialogTrigger>
					{showPostModal && <CreatePost onClose={() => setShowPostModal(false)} />}
				</Dialog>

				<div className='absolute bottom-10 flex flex-col items-center'>
					<Image
						src='/quedoor-navbar.png'
						alt='quedoor-logo'
						objectFit='contain'
						layout='fill'
						className='cursor-pointer !w-auto !h-12 !relative'
						onClick={() => router.push('/')}
					/>
					<Text className='text-xs text-gray-400 font-semibold'>v 0.0.1</Text>
				</div>
			</div>
		</header>
	);
};

export default Sidebar;
