'use client';
import QuedoorLogoIcon from '@/assets/icons/QuedoorLogoIcon';
import Text from '@/ui/Text';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip';
import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import clsx from 'clsx';
import { login, register } from '@/queries/auth';
import useAuth from '@/hooks/useAuth';

import { useRouter } from 'next/navigation';
import validator from 'validator';
import { Input } from '@/ui/input';
import { setCookie, setItem } from '@/lib/misc';
import { Button } from '@/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/ui/use-toast';
import { BiLoaderAlt } from 'react-icons/bi';

export default function Login() {
	const { user, updateUser } = useAuth();
	const router = useRouter();
	const { toast } = useToast();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoginView, setIsLoginView] = useState<boolean>(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [error, setError] = useState({
		name: false,
		email: false,
		password: false,
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
		switch (type) {
			case 'email': {
				const _email = e.target.value || '';
				setError((prev) => ({ ...prev, email: !validator.isEmail(_email.trim()) }));
				setEmail(_email);
				break;
			}
			case 'password': {
				const _pass = e.target.value || '';
				setError((prev) => ({
					...prev,
					password: !validator.isStrongPassword(_pass.trim(), {
						minLength: 8,
						minLowercase: 1,
						minUppercase: 1,
						minNumbers: 1,
						minSymbols: 0,
					}),
				}));
				setPassword(_pass);
				break;
			}
			case 'name': {
				const _name = e.target.value || '';
				setError((prev) => ({ ...prev, name: _name.trim() === '' }));

				setUsername(_name);
				break;
			}
			default:
				break;
		}
	};

	const handleSubmit: FormEventHandler = async (e: FormEvent<HTMLInputElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		if (!isLoginView) {
			const payload = {
				email: email.trim(),
				password: password,
				name: username.trim(),
			};
			try {
				const res = await register(payload);
				if (!res.success) {
					toast({
						title: 'Failed to register! Please try again.',
						variant: 'destructive',
					});
				} else {
					toast({
						title: 'User created successfully.',
					});

					setIsLoginView(true);
				}
			} catch (error) {
				toast({
					title: 'Failed to register! Please try again.',
					variant: 'destructive',
				});
			}
		} else {
			const payload = {
				email: email.trim(),
				password: password,
			};
			try {
				const res = await login(payload);
				if (res.status > 300 || !res) {
					toast({
						title: 'Failed to login! Please try again.',
						variant: 'destructive',
					});
				} else {
					toast({
						title: 'User logged in successfully.',
					});
					updateUser(res.result);
					setItem('quedoor-token', res.result.access_token);
					setCookie('quedoor-token', res.result.access_token);
					router.push('/');
				}
			} catch (error) {
				toast({
					title: 'Failed to login! Please try again.',
					variant: 'destructive',
				});
			}
		}

		setIsSubmitting(false);
		return false;
	};

	const handleTogglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	const resetFields = () => {
		setUsername('');
		setEmail('');
		setPassword('');
		setError({
			name: false,
			email: false,
			password: false,
		});
	};

	const handleChangeView = () => {
		setIsLoginView((prev) => !prev);
		resetFields();
	};

	if (user && user.id) {
		router.push('/');
		return true;
	}

	return (
		<main className='flex min-h-screen flex-col items-center justify-center'>
			<div
				className={clsx(
					'bg-white flex flex-col gap-8 items-center rounded-lg w-[380px] ease-in-out duration-300 shadow-lg p-8 transition-all',
					isLoginView ? 'h-[485px]' : 'h-[600px]'
				)}
			>
				<div className='flex gap-2 items-center'>
					<QuedoorLogoIcon size={48} />
					<Text className='font-black text-4xl text-black'>Quedoor</Text>
				</div>

				<form className='flex flex-col gap-2 w-full bg-white items-center' onSubmit={handleSubmit}>
					<Text className='font-semibold text-slate-600 mb-1'>
						{isLoginView ? 'Log in to your account' : 'Create your Quedoor account'}
					</Text>
					{!isLoginView && (
						<Input
							value={username}
							className={cn('pr-8', error.name ? 'border-destructive border-2 focus-visible:outline-destructive' : '')}
							onChange={(e) => handleChange(e, 'name')}
							type='name'
							placeholder='Full Name'
							required
						/>
					)}
					<Input
						type='email'
						className={cn('pr-8', error.email ? 'border-destructive border-2 focus-visible:outline-destructive' : '')}
						value={email}
						onChange={(e) => handleChange(e, 'email')}
						placeholder='Enter Email'
						required
					/>

					<div className='relative w-full'>
						<Input
							className={cn(
								'pr-8',
								error.password ? 'border-destructive border-2 focus-visible:outline-destructive' : ''
							)}
							value={password}
							onChange={(e) => handleChange(e, 'password')}
							required
							type={showPassword ? 'text' : 'password'}
							placeholder='Enter password'
						/>
						{showPassword ? (
							<FaEyeSlash onClick={handleTogglePassword} className='absolute right-3 top-3' />
						) : (
							<FaEye onClick={handleTogglePassword} className='absolute right-3 top-3' />
						)}
					</div>
					{!isLoginView && (
						<ul className='self-start list-disc relative ml-5'>
							<li className='text-sm font-medium'>Mix of uppercase and lowercase</li>
							<li className='text-sm font-medium'>Minimum 8 characters long</li>
							<li className='text-sm font-medium'>Contain at least 1 number</li>
						</ul>
					)}
					<Button
						type='submit'
						variant='default'
						disabled={
							!email ||
							!password ||
							(!isLoginView && !username) ||
							error.email ||
							error.password ||
							(!isLoginView && error.name) ||
							isSubmitting
						}
						className='w-full'
					>
						{isSubmitting ? <BiLoaderAlt className='mr-2 h-4 w-4 animate-spin' /> : 'Submit'}
					</Button>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className='w-full' disabled>
								<Button disabled className='w-full'>
									Continue with Github
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Coming Soon!</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger className='w-full' disabled>
								<Button disabled className='w-full'>
									Continue with Google
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Coming Soon!</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</form>

				<footer className='flex flex-col gap-1 items-center'>
					<Text className='text-sm font-light'>{isLoginView ? 'New to Quedoor?' : 'Have an account?'}</Text>
					<Text className='underline text-xs font-semibold cursor-pointer' as='div' onClick={handleChangeView}>
						{isLoginView ? 'Create an account' : 'Log in'}
					</Text>
				</footer>
			</div>
		</main>
	);
}
