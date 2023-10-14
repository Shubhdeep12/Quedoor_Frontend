'use client';

// import FeedFilled from '@/assets/icons/FeedFilled';
// import FeedOutlined from '@/assets/icons/FeedOutlined';
// import QuedoorLogoIcon from '@/assets/icons/QuedoorLogoIcon';
import { usePathname, useRouter } from 'next/navigation';
import { LuSearch } from 'react-icons/lu';
import Text from './Text';
import {
	Avatar,
	Button,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Switch,
} from '@chakra-ui/react';
import { GoChevronDown } from 'react-icons/go';
// import AvatarFilled from '@/assets/icons/AvatarFilled';
// import AvatarOutlined from '@/assets/icons/AvatarOutlined';
import useAuth from '@/hooks/useAuth';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import Image from 'next/image';

export default function Navbar() {
	const pathname = usePathname();
	const { user } = useAuth();
	const router = useRouter();
	if (pathname.startsWith('/login')) {
		return null;
	}
	return (
		<div className='w-full py-0.5 shadow-sm bg-neutral-50'>
			<div className='flex px-8 gap-8 h-[60px] items-center justify-between relative '>
				<Image
					src='/quedoor-navbar.png'
					alt='quedoor-logo'
					objectFit='contain'
					layout='fill'
					className='cursor-pointer !w-60 !h-50 !relative'
					onClick={() => router.push('/feed')}
				/>

				{/* <div className='flex gap-8 items-center'>
					<button
						className='flex flex-col p-2 gap-0.5 items-center cursor-pointer'
						onClick={() => router.push('/feed')}
					>
						{pathname.startsWith('/feed') ? <FeedFilled className='fill-primary-light' /> : <FeedOutlined />}
						<Text className='text-sm text-neutral-500'>Feed</Text>
					</button>
					<button
						className='flex flex-col p-2 gap-0.5 items-center cursor-pointer'
						onClick={() => router.push('/profile')}
					>
						{pathname.startsWith('/profile') ? <AvatarFilled className='fill-primary-light' /> : <AvatarOutlined />}
						<Text className='text-sm text-neutral-500'>Profile</Text>
					</button>
				</div> */}

				<div className='flex items-center gap-8 flex-1 justify-end'>
					<button className='flex flex-1 max-w-md justify-between items-center hover:bg-neutral-100 cursor-pointer transition-all border border-neutral-200 rounded-lg py-3 px-5'>
						<Text className='text-sm text-neutral-500'>Search post using image, text, etc.</Text>
						<LuSearch size={16} />
					</button>

					<Popover>
						<PopoverTrigger>
							<button className='flex items-center gap-1 cursor-pointer'>
								<Avatar size='sm' name={user?.name} src={user?.profileImg} />
								<GoChevronDown size={16} />
							</button>
						</PopoverTrigger>
						<PopoverContent className='w-[250px] overflow-hidden m-2'>
							<PopoverArrow />
							<PopoverBody className='p-0 flex flex-col items-center w-[250px]'>
								<div className='flex flex-col items-center border-b w-full pb-5'>
									<div className='flex flex-col gap-1 items-center px-4 py-5'>
										<Avatar size='xl' name={user?.name} src={user?.profileImg} />
										<div className='flex flex-col gap-0.5 items-center'>
											<Text className='font-bold text-sm'>{user?.name}</Text>
											<Text className='text-xs'>{user?.email}</Text>
										</div>
									</div>
									<Button variant='outline' rounded='md' className='w-fit'>
										<Text className='font-bold'>Go to my Profile</Text>
									</Button>
								</div>
								<button className='px-4 py-3 border-b w-full justify-center flex gap-2 items-center cursor-pointer'>
									<Text>Switch Theme</Text> <Switch colorScheme='red' />
								</button>
								<button className='px-4 py-3 flex w-full justify-center  gap-1 items-center cursor-pointer'>
									<RiLogoutCircleRLine /> <Text>Sign out</Text>
								</button>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	);
}
