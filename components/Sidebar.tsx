'use client';

import Text from '@/ui/Text';
import useAuth from '@/hooks/useAuth';
import clsx from 'clsx';
import { useState } from 'react';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { BsFilePost } from 'react-icons/bs';
import { IoCreate } from 'react-icons/io5';
import { FaCircleChevronUp } from 'react-icons/fa6';
import { CgPushChevronLeftO, CgPushChevronRightO } from 'react-icons/cg';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Dialog, DialogTrigger } from '@/ui/dialog';
import CreatePost from './CreatePost';

const Sidebar = () => {
	const { user } = useAuth();
	const [recentActivityCollapsed, setRecentActivityCollapsed] = useState<boolean>(true);
	const [recentFollowersCollapsed, setRecentFollowersCollapsed] = useState<boolean>(true);
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div
			className={clsx(
				'left-section p-6 border-r w-96 min-w-max h-[calc(100vh-65px)] sticky bg-primary-foreground',
				'backdrop-blur-[10px] backdrop-saturate-200	flex flex-col gap-10',
				'transform transition',
				sidebarOpen ? 'translate-x-0' : '-translate-x-96'
			)}
		>
			<div className='flex items-center gap-2'>
				<Avatar className='w-8 h-8'>
					<AvatarImage src={user?.profile_img} />
					<AvatarFallback className='text-sm'>
						{user?.name
							.match(/(\b\S)?/g)
							.join('')
							.match(/(^\S|\S$)?/g)
							.join('')
							.toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<Text className='text-sm font-bold'>Shubhdeep Chhabra</Text>
			</div>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogTrigger asChild onClick={() => setIsModalOpen(true)}>
					<Button className='flex items-center gap-1'>
						<IoCreate size={18} />
						<Text className='font-medium text-base'>Create</Text>
					</Button>
				</DialogTrigger>

				<CreatePost onClose={() => setIsModalOpen(false)} />
			</Dialog>

			<div className='flex flex-col items-start gap-4'>
				<div
					className='w-full flex items-center justify-between cursor-pointer transition-all p-2 rounded-md hover:bg-secondary'
					onClick={() => setRecentActivityCollapsed((prev) => !prev)}
				>
					<Text className='text-sm font-bold'>Recent Activity</Text>
					<FaCircleChevronUp
						className={clsx({
							'transition-all': true,
							'rotate-180': recentActivityCollapsed,
							'cursor-pointer': true,
						})}
						size={18}
					/>
				</div>
				<div
					className={clsx({
						'w-full flex flex-col items-start gap-2 overflow-hidden transition-height duration-200 ease-in-out': true,
						'h-52': !recentActivityCollapsed,
						'h-0': recentActivityCollapsed,
					})}
				>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BsFilePost size={14} />
						Title of post created by you...
					</Text>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BsFilePost size={14} />
						Title of post created by you...
					</Text>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BiSolidCommentDetail size={14} />
						Title of comment created by you...
					</Text>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BsFilePost size={14} />
						Title of post created by you...
					</Text>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BiSolidCommentDetail size={14} />
						Title of comment created by you...
					</Text>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BsFilePost size={14} />
						Title of post created by you...
					</Text>
					<Text className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
						<BsFilePost size={14} />
						Title of post created by you...
					</Text>
				</div>
			</div>

			<div className='flex flex-col items-start gap-4'>
				<div
					className='w-full flex items-center justify-between cursor-pointer transition-all p-2 rounded-md hover:bg-secondary'
					onClick={() => setRecentFollowersCollapsed((prev) => !prev)}
				>
					<Text className='text-sm font-bold'>Recent Followers</Text>
					<FaCircleChevronUp
						className={clsx({
							'transition-all': true,
							'rotate-180': recentFollowersCollapsed,
							'cursor-pointer': true,
						})}
						size={18}
					/>
				</div>
				<div
					className={clsx({
						'w-full flex flex-col items-start gap-2 overflow-hidden transition-height duration-200 ease-in-out': true,
						'h-60': !recentFollowersCollapsed,
						'h-0': recentFollowersCollapsed,
					})}
				>
					{Array(5)
						.fill(1)
						.map((id) => (
							<div
								key={id}
								className='text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'
							>
								<Avatar className='w-8 h-8'>
									<AvatarImage src={user?.profile_img} />
									<AvatarFallback className='text-sm'>
										{user?.name
											.match(/(\b\S)?/g)
											.join('')
											.match(/(^\S|\S$)?/g)
											.join('')
											.toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<Text className='text-sm'>Shubhdeep Chhabra</Text>
							</div>
						))}
					<Text className='text-sm font-semibold hover:underline underline-offset-2 cursor-pointer transition'>
						Show All
					</Text>
				</div>
			</div>

			<div
				className={clsx(
					'absolute top-4 hover:scale-105 transition shadow-lg rounded-full',
					sidebarOpen ? '-right-3' : '-right-6'
				)}
				onClick={() => setSidebarOpen((prev) => !prev)}
			>
				{sidebarOpen ? <CgPushChevronLeftO size={24} /> : <CgPushChevronRightO size={24} />}
			</div>
		</div>
	);
};

export default Sidebar;
