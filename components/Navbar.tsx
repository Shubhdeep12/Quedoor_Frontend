'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LuSearch } from 'react-icons/lu';
import Text from '../ui/Text';

import { GoChevronDown } from 'react-icons/go';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import { logout } from '@/queries/auth';
import { clearItem, removeCookie } from '@/lib/misc';
import { PiSignOutBold } from 'react-icons/pi';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { FiSettings } from 'react-icons/fi';
import { useTheme } from 'next-themes';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { BiUser } from 'react-icons/bi';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/ui/alert-dialog';
import { useToast } from '@/ui/use-toast';

export default function Navbar() {
	const { setTheme } = useTheme();
	const pathname = usePathname();
	const { user } = useAuth();
	const router = useRouter();
	const { toast } = useToast();

	const [alert, setAlert] = useState({
		isOpen: false,
		header: '',
		description: '',
		action: () => {},
	});

	const handleAlertReset = () => {
		setAlert({
			isOpen: false,
			header: '',
			description: '',
			action: () => {},
		});
	};
	const handleLogout = async (e: MouseEvent) => {
		e.preventDefault();
		const res = await logout();
		if (res.status < 300) {
			toast({
				title: 'Logged out successfully.',
			});
			clearItem('quedoor-token');
			removeCookie('quedoor-token');
			window.location.pathname = '/login';
		}
		toast({
			title: 'Failed to logout! Please try again.',
			variant: 'destructive',
		});
	};

	if (pathname.startsWith('/login')) {
		return null;
	}
	return (
		<header className='sticky top-0 z-50 flex px-8 py-4 gap-8 items-center justify-between w-full shadow-sm bg-primary-foreground border-b '>
			<Image
				src='/quedoor-navbar.png'
				alt='quedoor-logo'
				objectFit='contain'
				layout='fill'
				className='cursor-pointer !w-52 !h-8 !relative'
				onClick={() => router.push('/')}
			/>

			<div className='flex items-center gap-4 flex-1 h-8 justify-end'>
				<Button
					variant='outline'
					className='flex flex-1 max-w-md justify-between items-center h-8 hover:bg-neutral-100 dark:hover:bg-neutral-50 cursor-pointer transition-all border-none outline outline-1 outline-slate-300 rounded-md py-2 px-5'
				>
					<Text className='text-xs font-semibold text-neutral-500'>Search post using image, text, etc.</Text>
					<LuSearch size={16} />
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className='flex items-center gap-1 cursor-pointer'>
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
							<GoChevronDown color='gray' size={16} />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='w-40 overflow-hidden mx-2'>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => setTheme('dark')}>
								<BiUser className='mr-2 h-4 w-4' />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme('light')}>
								<FiSettings className='mr-2 h-4 w-4' />
								<span>Settings</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={(e) =>
								setAlert({
									isOpen: true,
									header: 'Are you absolutely sure?',
									description: 'This action cannot be undone. This will log out you from Quedoor.',
									action: () => {
										handleLogout(e);
									},
								})
							}
						>
							<PiSignOutBold className='mr-2 h-4 w-4' /> <Text>Log out</Text>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<AlertDialog open={alert.isOpen} onOpenChange={handleAlertReset}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>{alert.header}</AlertDialogTitle>
							<AlertDialogDescription>{alert.description}</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={alert.action}>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</header>
	);
}
