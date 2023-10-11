'use client';

import Text from '@/components/Text';
// import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { RiUserFollowLine } from 'react-icons/ri';

export default function Feed() {
	// const { user } = useAuth();
	return (
		<div className='flex gap-10 mt-12'>
			<div className='left-section'>
				<div className='profile-widget h-64 w-60 bg-white rounded-lg flex flex-col items-center gap-5 relative'>
					<div className='relative w-full h-[120px] bg-black rounded-t-lg'>
						<Image layout='fill' objectFit='contain' src='/shubh-avatar.png' alt='profile-photo' />
					</div>
					<div className='mx-4 flex flex-col items-center gap-7 border-b flex-1'>
						<Text className='font-bold'>Shubhdeep Chhabra</Text>
					</div>
					<div className='flex gap-4'>
						<div className='flex gap-2 items-center'>
							<div className='rounded-xl border p-2'>
								<RiUserFollowLine size={18} />
							</div>
							<Text className='flex flex-col'>
								10
								<Text className='text-xs text-gray-400'>Followers</Text>
							</Text>
						</div>
						<div className='h-full w-[1px] border-l' />
						<div className='flex gap-2 items-center'>
							<div className='rounded-xl border p-2'>
								<RiUserFollowLine size={18} />
							</div>
							<Text className='flex flex-col'>
								10
								<Text className='text-xs text-gray-400'>Followers</Text>
							</Text>
						</div>
					</div>
				</div>
			</div>
			<div className='main-section flex-1'>Main Section</div>
			<div className='right-section w-auto'>Right Section</div>
		</div>
	);
}
