'use client';

import Text from '@/ui/Text';
import useAuth from '@/hooks/useAuth';
import clsx from 'clsx';
import { useState } from 'react';
import { IoCreate } from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Dialog, DialogTrigger } from '@/ui/dialog';
import CreatePost from './CreatePost';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaPager, FaUserFriends } from 'react-icons/fa';
import Filter from './Filter';
import { AiFillSetting } from 'react-icons/ai';
import { BiSolidUserCircle } from 'react-icons/bi';

const Sidebar = () => {
	const { user } = useAuth();
	const router = useRouter();
	const [postModal, setPostModal] = useState({
		show: false,
		action: '',
	});
	const [activeTab, setActiveTab] = useState('feed');

	const handleModalReset = (val: any) => {
		setPostModal({ show: val, action: '' });
	};

	const sidebarOptions = [
		{
			id: 'feed',
			title: 'Feed',
			icon: FaPager,
			route: '/',
		},
		{
			id: 'friends',
			title: 'Friends',
			icon: FaUserFriends,
			route: '/',
		},
		{
			id: 'profile',
			title: 'Profile',
			icon: BiSolidUserCircle,
			route: '/',
		},
		{
			id: 'settings',
			title: 'Settings',
			icon: AiFillSetting,
			route: '/',
		},
	];

	return (
		<div className={clsx('left-section w-2/4 h-screen sticky flex flex-col')}>
			<div className='p-10 flex flex-col gap-10 items-center w-80 self-end'>
				<div className='flex flex-col w-full gap-2 items-center'>
					<Avatar className='w-24 h-24'>
						<AvatarImage src={user?.profile_img} />
						<AvatarFallback className='text-2xl font-bold'>
							{user?.name
								.match(/(\b\S)?/g)
								.join('')
								.match(/(^\S|\S$)?/g)
								.join('')
								.toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<Text className='font-semibold text-sm'>{user.name}</Text>
					<Text className='font-semibold text-sm text-gray-500 -mt-1'>{user.email}</Text>
				</div>

				<div className='flex flex-col w-full items-center gap-4'>
					{sidebarOptions.map(({ id, title, icon: Icon }) => (
						<div
							key={id}
							onClick={() => setActiveTab(id)}
							className={clsx(
								activeTab === id ? 'bg-black' : 'bg-transparent hover:bg-gray-200',
								'transition p-3 rounded-2xl w-full flex gap-3 cursor-pointer'
							)}
						>
							<Icon size={24} className={clsx(activeTab === id ? '!fill-gray-100' : '!fill-black')} />
							<Text className={clsx(activeTab === id ? 'text-gray-100' : 'text-black', 'text-base font-semibold ')}>
								{title}
							</Text>
						</div>
					))}
				</div>

				<Dialog open={postModal.show} onOpenChange={handleModalReset}>
					<DialogTrigger asChild>
						<div className='w-full flex gap-4 items-center'>
							<Button
								className='flex h-fit py-3 px-4 rounded-full items-center gap-1 flex-1 bg-gradient-to-bl from-blue-400 to-red-400'
								onClick={() =>
									setPostModal({
										show: true,
										action: 'CREATE',
									})
								}
							>
								<IoCreate size={18} />
								<Text className='font-bold text-xl'>Create</Text>
							</Button>

							{/* <FaFilter
							size={22}
							onClick={() =>
								setPostModal({
									show: true,
									action: 'FILTER',
								})
							}
						/> */}
						</div>
					</DialogTrigger>
					{postModal.show &&
						(postModal.action === 'CREATE' ? (
							<CreatePost
								onClose={() =>
									setPostModal({
										show: false,
										action: '',
									})
								}
							/>
						) : (
							<Filter
								onClose={() =>
									setPostModal({
										show: false,
										action: '',
									})
								}
							/>
						))}
				</Dialog>

				<div className='absolute bottom-10'>
					<Image
						src='/quedoor-navbar.png'
						alt='quedoor-logo'
						objectFit='contain'
						layout='fill'
						className='cursor-pointer !w-auto !h-12 !relative'
						onClick={() => router.push('/')}
					/>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
