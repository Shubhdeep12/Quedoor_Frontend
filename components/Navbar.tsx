'use client';

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
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { logout } from '@/queries/auth';
import { clearItem, removeCookie } from '@/utils/misc';
import { FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
	const pathname = usePathname();
	const { user } = useAuth();
	const router = useRouter();
	const handleLogout = async (e: MouseEvent) => {
		e.preventDefault();
		const res = await logout();
		if (res.status < 300) {
			clearItem('quedoor-token');
			removeCookie('quedoor-token');
			window.location.pathname = '/login';
		}
	};

	if (pathname.startsWith('/login')) {
		return null;
	}
	return (
		<div className='flex px-8 py-4 gap-8 items-center justify-between relative w-full shadow-sm bg-primary-light-50 border-b border-b-slate-300'>
			<Image
				src='/quedoor-navbar.png'
				alt='quedoor-logo'
				objectFit='contain'
				layout='fill'
				className='cursor-pointer !w-52 !h-8 !relative'
				onClick={() => router.push('/')}
			/>

			<div className='flex items-center gap-4 flex-1 h-8 justify-end'>
				<Button className='flex flex-1 max-w-md justify-between items-center h-8 hover:bg-slate-100 cursor-pointer transition-all border border-slate-300 rounded-md py-2 px-5'>
					<Text className='text-xs font-semibold text-neutral-500'>Search post using image, text, etc.</Text>
					<LuSearch size={16} />
				</Button>

				<Popover>
					<PopoverTrigger>
						<Button colorScheme='transparent' className='bg-transparent flex items-center gap-1 cursor-pointer'>
							<Avatar size='sm' name={user?.name} src={user?.profileImg} />
							<GoChevronDown color='gray' size={16} />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-[250px] overflow-hidden mx-2'>
						<PopoverArrow />
						<PopoverBody className='p-0 flex flex-col items-center w-[250px]'>
							<div className='flex flex-col gap-1 items-center px-4 py-5 border-b'>
								<Avatar size='xl' name={user?.name} src={user?.profileImg} />
								<div className='flex flex-col gap-0.5 items-center'>
									<Text className='font-bold text-sm'>{user?.name}</Text>
									<Text className='text-xs'>{user?.email}</Text>
								</div>
							</div>

							<button className='px-4 py-3 border-b w-full justify-center flex gap-2 items-center cursor-pointer'>
								<Text>Switch Theme</Text> <Switch />
							</button>
							<button
								className='px-4 py-3 flex w-full justify-center  gap-1 items-center cursor-pointer'
								onClick={handleLogout}
							>
								<FaSignOutAlt /> <Text>Sign out</Text>
							</button>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
