'use client';
import QuedoorLogoIcon from '@/assets/icons/QuedoorLogoIcon';
import Text from '@/components/Text';
import {
	Button,
	Icon,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	ListItem,
	Tooltip,
	UnorderedList,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import clsx from 'clsx';

export default function Login() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoginView, setIsLoginView] = useState<boolean>(true);

	const handleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
		switch (type) {
			case 'email':
				setEmail(e.target.value);
				break;

			case 'password':
				setPassword(e.target.value);
				break;
			case 'name':
				setUsername(e.target.value);
				break;
			default:
				break;
		}
	};

	const handleSubmit: FormEventHandler = (e: FormEvent<HTMLInputElement>) => {
		e.preventDefault();

		return false;
	};

	const handleTogglePassword = () => {
		setShowPassword((prev) => !prev);
	};

	const resetFields = () => {
		setUsername('');
		setEmail('');
		setPassword('');
	};

	const handleChangeView = () => {
		setIsLoginView((prev) => !prev);
		resetFields();
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-center bg-slate-50'>
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
							onChange={(e) => handleChange(e, 'name')}
							type='name'
							placeholder='Full Name'
							required
						/>
					)}
					<Input
						value={email}
						onChange={(e) => handleChange(e, 'email')}
						type='email'
						placeholder='Enter Email'
						required
					/>
					<InputGroup size='md'>
						<Input
							pr='2rem'
							value={password}
							onChange={(e) => handleChange(e, 'password')}
							required
							type={showPassword ? 'text' : 'password'}
							placeholder='Enter password'
						/>
						<InputRightElement width='2rem' className='cursor-pointer'>
							<IconButton
								h='1.75rem'
								size='sm'
								onClick={handleTogglePassword}
								aria-label={showPassword ? 'Hide password' : 'Show password'}
								icon={<Icon as={showPassword ? FaEye : FaEyeSlash} />}
							/>
						</InputRightElement>
					</InputGroup>
					{!isLoginView && (
						<UnorderedList className='self-start'>
							<ListItem className='text-sm font-medium'>Mix of uppercase and lowercase</ListItem>
							<ListItem className='text-sm font-medium'>Minimum 8 characters long</ListItem>
							<ListItem className='text-sm font-medium'>Contain at least 1 number</ListItem>
						</UnorderedList>
					)}
					<Button
						type='submit'
						variant='solid'
						isDisabled={!email.trim() || !password.trim() || (!isLoginView && !username.trim())}
						className='w-full bg-slate-100'
					>
						Submit
					</Button>
					<Tooltip label='Coming Soon!' placement='top' p='2' borderRadius={'md'}>
						<Button variant='solid' isDisabled className='w-full bg-slate-100'>
							Continue with Github
						</Button>
					</Tooltip>
					<Tooltip label='Coming Soon!' placement='top' p='2' borderRadius={'md'}>
						<Button variant='solid' isDisabled className='w-full bg-slate-100'>
							Continue with Google
						</Button>
					</Tooltip>
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
