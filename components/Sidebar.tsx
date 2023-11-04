'use client';

import Text from '@/ui/Text';
import useAuth from '@/hooks/useAuth';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Dialog, DialogTrigger } from '@/ui/dialog';
import CreatePost from './CreatePost';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaPager, FaUserFriends } from 'react-icons/fa';
import Filter from './Filter';
import { AiFillSetting } from 'react-icons/ai';
import { BiSolidUserCircle } from 'react-icons/bi';
import { RiSearchEyeLine } from 'react-icons/ri';

const Sidebar = () => {
	const { user } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	const [postModal, setPostModal] = useState({
		show: false,
		action: '',
	});
	const [activeTab, setActiveTab] = useState('feed');

	const handleModalReset = (val: any) => {
		setPostModal({ show: val, action: '' });
	};

	useEffect(() => {
		if (pathname.startsWith('/profile')) setActiveTab('profile');
		else if (pathname.startsWith('/friends')) setActiveTab('friends');
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
			id: 'friends',
			title: 'Friends',
			icon: FaUserFriends,
			route: '/friends',
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

	const isSearchPage = () => pathname.startsWith('/search');

	if (pathname.startsWith('/login') || !user) {
		return null;
	}

	return (
		<header className={clsx('left-section w-[40%] h-screen sticky flex flex-col')}>
			<div className='p-10 flex flex-col gap-10 items-center w-80 self-end'>
				<div className='flex flex-col w-full gap-2 items-center'>
					<Avatar className='w-24 h-24'>
						<AvatarImage src={user?.profile_img} />
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
						<Button
							key={id}
							onClick={() => {
								setActiveTab(id);
								router.push(route);
							}}
							className={clsx(
								activeTab === id ? 'bg-black' : 'bg-transparent hover:bg-gray-200',
								'transition py-7 rounded-2xl w-full justify-start flex gap-3 cursor-pointer'
							)}
						>
							<Icon size={24} className={clsx(activeTab === id ? '!fill-gray-100' : '!fill-black')} />
							<Text className={clsx(activeTab === id ? 'text-gray-100' : 'text-black', 'text-base font-semibold ')}>
								{title}
							</Text>
						</Button>
					))}
				</div>

				<Dialog open={postModal.show} onOpenChange={handleModalReset}>
					<DialogTrigger asChild>
						<Button
							className='w-full flex h-fit py-3 px-4 rounded-full items-center gap-1 flex-1 bg-gradient-to-bl from-blue-400 to-red-400'
							onClick={() =>
								setPostModal({
									show: true,
									action: isSearchPage() ? 'FILTER' : 'CREATE',
								})
							}
						>
							<Text className='font-bold text-xl'>{isSearchPage() ? 'Search Post' : 'Create Post'}</Text>
						</Button>
					</DialogTrigger>
					{postModal.show ? (
						postModal.action === 'FILTER' ? (
							<Filter
								onClose={() =>
									setPostModal({
										show: false,
										action: '',
									})
								}
							/>
						) : (
							<CreatePost
								onClose={() =>
									setPostModal({
										show: false,
										action: '',
									})
								}
							/>
						)
					) : null}
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
