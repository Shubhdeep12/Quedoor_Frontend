'use client';

import Text from '@/components/Text';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { LuUsers } from 'react-icons/lu';
import { RiUserFollowLine } from 'react-icons/ri';
import { HiMiniUsers } from 'react-icons/hi2';
import { ImPriceTags } from 'react-icons/im';

export default function Feed() {
	const { user } = useAuth();
	return (
		<div className='flex gap-10 mt-12'>
			<div className='left-section w-64 flex flex-col gap-6'>
				<div className='profile-widget h-64 w-full bg-white rounded-lg flex flex-col items-center gap-5 relative'>
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
				</div>
			</div>
			<div className='main-section flex-1 h-max bg-white'>Main Section</div>
			<div className='right-section w-64 flex flex-col gap-6'>
				<div className='recommend-user-widget max-h-72 h-auto w-full bg-white rounded-lg flex flex-col items-center gap-5 relative'>
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
				</div>
			</div>
		</div>
	);
}
