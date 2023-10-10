'use client';

import FeedFilled from '@/assets/icons/FeedFilled';
import FeedOutlined from '@/assets/icons/FeedOutlined';
import QuedoorLogoIcon from '@/assets/icons/QuedoorLogoIcon';
import { usePathname, useRouter } from 'next/navigation';
import { LuSearch } from 'react-icons/lu';
import Text from './Text';
import { Avatar, Button, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import { GoChevronDown } from 'react-icons/go';
import AvatarFilled from '@/assets/icons/AvatarFilled';
import AvatarOutlined from '@/assets/icons/AvatarOutlined';
import useAuth from '@/hooks/useAuth';
import { RiLogoutCircleRLine } from 'react-icons/ri';

export default function Navbar() {
	const pathname = usePathname();
	const { user } = useAuth();
	const router = useRouter();
	if (pathname.startsWith('/login')) {
		return null;
	}
	return (
		<div className='w-full py-0.5 shadow-sm bg-white'>
			<div className='flex px-8 gap-8 h-[60px] items-center max-w-laptop mx-auto'>
				<QuedoorLogoIcon size={60} className='cursor-pointer' onClick={() => router.push('/feed')} />
				<div className='flex flex-1 justify-between items-center hover:bg-slate-50 cursor-pointer transition-all border border-neutral-200 rounded-full py-3 px-5'>
					<Text className='text-sm text-neutral-500'>Search post using image, text, etc.</Text>
					<LuSearch size={16} />
				</div>
				<div className='w-[1px] h-full border' />
				<div className='flex gap-8 items-center'>
					<div className='flex flex-col p-2 gap-0.5 items-center cursor-pointer' onClick={() => router.push('/feed')}>
						{pathname.startsWith('/feed') ? <FeedFilled className='fill-orange-400' /> : <FeedOutlined />}
						<Text className='text-sm text-neutral-500'>Feed</Text>
					</div>
					<div
						className='flex flex-col p-2 gap-0.5 items-center cursor-pointer'
						onClick={() => router.push('/profile')}
					>
						{pathname.startsWith('/profile') ? <AvatarFilled className='fill-orange-400' /> : <AvatarOutlined />}
						<Text className='text-sm text-neutral-500'>Profile</Text>
					</div>
				</div>
				<div className='w-[1px] h-full border' />

				<Popover>
					<PopoverTrigger>
						<div className='flex items-center gap-1 cursor-pointer'>
							<Avatar bg='red.500' size='sm' name={user?.name} src={user?.profileImg} />
							<GoChevronDown size={16} />
						</div>
					</PopoverTrigger>
					<PopoverContent className='w-[250px] overflow-hidden'>
						<PopoverArrow />
						<PopoverBody className='p-0 flex flex-col items-center w-[250px]'>
							<div className='flex flex-col items-center border-b w-full pb-5'>
								<div className='flex flex-col gap-1 items-center px-4 py-5'>
									<Avatar size='xl' name={user?.name} src={user?.profileImg} />
									<div className='flex flex-col gap-0.5 items-center'>
										<Text className='font-bold text-sm'>Shubhdeep Chhabra</Text>
										<Text className='text-xs'>chhabrashubhdeep@gmail.com</Text>
									</div>
								</div>
								<Button variant='outline' rounded='full' className='w-fit'>
									<Text className='font-bold'>Go to my Profile</Text>
								</Button>
							</div>
							<div className='px-4 py-3 flex gap-1 items-center cursor-pointer'>
								<RiLogoutCircleRLine /> <Text>Sign out</Text>
							</div>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
