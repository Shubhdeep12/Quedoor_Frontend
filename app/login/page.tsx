'use client';
import QuedoorLogoIcon from '@/assets/icons/QuedoorLogoIcon';
import Text from '@/ui/Text';
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
	useToast,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import clsx from 'clsx';
import { login, register } from '@/queries/auth';
import useAuth from '@/hooks/useAuth';
import {
	setCookie,
	// setCookie,
	setItem,
} from '@/utils/misc';
import { useRouter } from 'next/navigation';
import validator from 'validator';

export default function Login() {
	const { user, updateUser } = useAuth();
	const router = useRouter();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoginView, setIsLoginView] = useState<boolean>(true);

	const toast = useToast();

	const [error, setError] = useState({
		name: false,
		email: false,
		password: false,
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
		switch (type) {
			case 'email': {
				const _email = (e.target.value || '').trim();
				setError((prev) => ({ ...prev, email: !validator.isEmail(_email) }));
				setEmail(_email);
				break;
			}
			case 'password': {
				const _pass = (e.target.value || '').trim();
				setError((prev) => ({
					...prev,
					password: !validator.isStrongPassword(_pass, {
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
				const _name = (e.target.value || '').trim();
				setError((prev) => ({ ...prev, name: _name === '' }));

				setUsername(_name);
				break;
			}
			default:
				break;
		}
	};

	const handleSubmit: FormEventHandler = async (e: FormEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (!isLoginView) {
			const res = await register({ email, password, name: username });
			if (!res.success) {
				toast({
					title: 'Failed to register! Please try again.',
					status: 'error',
					isClosable: true,
					position: 'top-right',
				});
			} else {
				toast({
					title: 'User created successfully.',
					status: 'success',
					isClosable: true,
					position: 'top-right',
				});

				setIsLoginView(true);
			}
		} else {
			const res = await login({ email, password, name: username });
			if (res.status > 300) {
				toast({
					title: 'Failed to login! Please try again.',
					status: 'error',
					isClosable: true,
					position: 'top-right',
				});
			} else {
				toast({
					title: 'User logged in successfully.',
					status: 'success',
					isClosable: true,
					position: 'top-right',
				});
				updateUser(res.result);
				setItem('quedoor-token', res.result.access_token);
				setCookie('quedoor-token', res.result.access_token);
				router.push('/');
			}
		}

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
							isInvalid={error.name}
							errorBorderColor='red.500'
							focusBorderColor={error.name ? 'red.400' : 'gray.500'}
							onChange={(e) => handleChange(e, 'name')}
							type='name'
							placeholder='Full Name'
							required
						/>
					)}
					<Input
						type='email'
						isInvalid={error.email}
						errorBorderColor='red.500'
						focusBorderColor={error.email ? 'red.500' : 'gray.500'}
						value={email}
						onChange={(e) => handleChange(e, 'email')}
						placeholder='Enter Email'
						required
					/>

					<InputGroup size='md'>
						<Input
							pr='2rem'
							isInvalid={error.password}
							errorBorderColor='red.500'
							focusBorderColor={error.password ? 'red.400' : 'gray.500'}
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
						isDisabled={
							!email ||
							!password ||
							(!isLoginView && !username) ||
							error.email ||
							error.password ||
							(!isLoginView && error.name)
						}
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
