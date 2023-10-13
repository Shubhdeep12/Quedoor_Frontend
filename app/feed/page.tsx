'use client';

import Text from '@/components/Text';
import useAuth from '@/hooks/useAuth';
// import Image from 'next/image';
// import { LuUsers } from 'react-icons/lu';
// import { RiUserFollowLine } from 'react-icons/ri';
// import { HiMiniUsers } from 'react-icons/hi2';
// import { ImPriceTags } from 'react-icons/im';
import { Avatar, Button } from '@chakra-ui/react';
import { IoCreateOutline } from 'react-icons/io5';
import { BsFilePost } from 'react-icons/bs';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { TbSquareChevronDown } from 'react-icons/tb';
import { useState } from 'react';
import clsx from 'clsx';

export default function Feed() {
	const { user } = useAuth();
	const [recentActivityCollapsed, setRecentActivityCollapsed] = useState<boolean>(false);
	const [recentFollowersCollapsed, setRecentFollowersCollapsed] = useState<boolean>(false);
	return (
		<div className='flex gap-10'>
			<div
				className='left-section
					p-6
					border-r
					w-1/5 min-w-max  h-[calc(100vh-64px)]
					bg-primary-light bg-opacity-5
					flex flex-col gap-10'
			>
				{/* <div className='profile-widget h-64 w-full bg-white rounded-lg flex flex-col items-center gap-5 relative'>
					<div className='relative w-full h-[120px] bg-black rounded-t-lg'>
						<Image
							layout='fill'
							objectFit='contain'
							src={user?.profileImg || '/shubh-avatar.png'}
							alt='profile-photo'
						/>
					</div>
					<div className='mx-4 flex flex-col items-center gap-6 p-3 flex-1'>
						<Text className='font-bold'>{user?.name}</Text>
						<div className='flex gap-4 border-t pt-3'>
							<div className='flex gap-2 items-center'>
								<div className='rounded-xl border p-2'>
									<RiUserFollowLine size={16} />
								</div>
								<Text className='flex flex-col'>
									10
									<Text className='text-xs text-gray-400'>Followers</Text>
								</Text>
							</div>
							<div className='h-full w-[1px] border-l' />
							<div className='flex gap-2 items-center'>
								<div className='rounded-xl border p-2'>
									<LuUsers size={16} />
								</div>
								<Text className='flex flex-col'>
									10
									<Text className='text-xs text-gray-400'>Followers</Text>
								</Text>
							</div>
						</div>
					</div>
				</div> */}

				<div className='flex justify-between w-full'>
					<div className='flex items-center gap-2'>
						<Avatar size='sm' name={user?.name} src={user?.profileImg} />
						<Text className='text-sm font-bold'>Shubhdeep Chhabra</Text>
					</div>

					<Button className='bg-purple-400' colorScheme='purple' size='sm' variant='solid'>
						<IoCreateOutline size={16} />
						&nbsp;&nbsp;Create
					</Button>
				</div>

				<div className='flex flex-col items-start gap-4'>
					<div className='w-full flex items-center justify-between'>
						<Text className='text-sm font-bold'>Recent Activity</Text>
						<TbSquareChevronDown
							onClick={() => setRecentActivityCollapsed((prev) => !prev)}
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
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BsFilePost size={14} />
							Title of post created by you...
						</Text>
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BsFilePost size={14} />
							Title of post created by you...
						</Text>
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BiSolidCommentDetail size={14} />
							Title of comment created by you...
						</Text>
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BsFilePost size={14} />
							Title of post created by you...
						</Text>
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BiSolidCommentDetail size={14} />
							Title of comment created by you...
						</Text>
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BsFilePost size={14} />
							Title of post created by you...
						</Text>
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BsFilePost size={14} />
							Title of post created by you...
						</Text>
					</div>
				</div>

				<div className='flex flex-col items-start gap-4'>
					<div className='w-full flex items-center justify-between'>
						<Text className='text-sm font-bold'>Recent Followers</Text>
						<TbSquareChevronDown
							onClick={() => setRecentFollowersCollapsed((prev) => !prev)}
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
							'h-80': !recentFollowersCollapsed,
							'h-0': recentFollowersCollapsed,
						})}
					>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<Text className='text-sm text-gray-500 font-semibold hover:underline underline-offset-2 cursor-pointer transition'>
							Show All
						</Text>
					</div>
				</div>
			</div>
			<div className='main-section flex-1 h-max bg-white'>Main Section</div>
			<div className='right-section w-64 flex flex-col gap-6'>
				{/* <div className='recommend-user-widget max-h-72 h-auto w-full bg-white rounded-lg flex flex-col items-center gap-5 relative'>
					<div className='w-full flex items-center py-3 px-3 gap-2 rounded-t-lg bg-primary-light'>
						<HiMiniUsers size={18} />
						<Text className='text-base font-bold'>Recommended Users</Text>
					</div>
					<div className='w-full'>
						<div className='mx-3 mb-3 rounded-xl bg-gray-200 p-5 flex items-center justify-center'>
							<Text className='text-sm font-semibold text-gray-400'>Coming Soon...</Text>
						</div>
					</div>
				</div>

				<div className='recommend-user-widget max-h-72 h-auto w-full bg-white rounded-lg flex flex-col items-center gap-5 relative'>
					<div className='w-full flex items-center py-3 px-3 gap-2 rounded-t-lg bg-primary-light'>
						<ImPriceTags size={18} />
						<Text className='text-base font-bold'>Recommended Tags</Text>
					</div>
					<div className='w-full'>
						<div className='mx-3 mb-3 rounded-xl bg-gray-200 p-5 flex items-center justify-center'>
							<Text className='text-sm font-semibold text-gray-400'>Coming Soon...</Text>
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
}
