'use client';

import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import validator from 'validator';
import PageLoader from '@/components/PageLoader';
import Text from '@/ui/Text';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import { BiLoaderAlt } from 'react-icons/bi';
import { TbPencil } from 'react-icons/tb';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { file2Base64 } from '@/lib/misc';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip';
import { updateUser } from '@/queries/people';
import { deleteAttachment, uploadAttachment } from '@/queries/misc';
import { useToast } from '@/ui/use-toast';
import { useAuthStore } from '@/store/zustand';

const Profile = () => {
	const router = useRouter();
	const { user } = useAuth();
	const { toast } = useToast();
	const imageRef = useRef<any>();
	const { updateUser: updateUserGlobal } = useAuthStore();
	const [userInfo, setUserInfo] = useState<any>(user);
	const [isFormDirty, setIsFormDirty] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState({
		name: false,
		email: false,
		website: false,
		image: false,
		city: false,
	});

	const handleUpdate = async () => {
		setIsSubmitting(true);

		let profileImg: string = '';
		if (user?.profile_img !== userInfo?.profile_img) {
			if (user?.profile_img && user.profile_img.length > 0) await deleteAttachment({ image_url: user?.profile_img });

			if (userInfo?.profile_img && userInfo?.file) {
				const data = new FormData();
				data.append('with_image_text', 'false');
				data.append('image', userInfo?.file);
				const res = await uploadAttachment(data);
				if (res.status < 300) {
					profileImg = res.result.image_url;
				}
			}
		}

		const payload = {
			name: userInfo?.name,
			website: userInfo?.website,
			city: userInfo?.city,
			...(user?.profile_img !== profileImg ? { profile_img: profileImg } : {}),
		};
		const res = await updateUser(user?.id, payload);
		if (res.status < 300) {
			setUserInfo(res.result);
			updateUserGlobal(res.result);
			toast({
				title: 'User data updated successfully.',
			});
		} else {
			toast({
				title: 'Failed to update user! Please try again.',
				variant: 'destructive',
			});
		}
		setIsSubmitting(false);
		return false;
	};

	const handleChange = (type: string, e: ChangeEvent<HTMLInputElement>) => {
		switch (type) {
			case 'email': {
				const _email = e.target.value || '';
				if (_email.length <= 100) {
					setError((prev) => ({ ...prev, email: !validator.isEmail(_email.trim()) }));
					setUserInfo((prev: any) => ({ ...prev, email: _email }));
				}
				break;
			}
			case 'name': {
				const _name = e.target.value || '';
				setError((prev) => ({ ...prev, name: _name.trim() === '' }));
				setUserInfo((prev: any) => ({ ...prev, name: _name }));
				break;
			}
			case 'city': {
				const _city = e.target.value || '';
				setError((prev) => ({ ...prev, city: _city.trim() === '' }));
				setUserInfo((prev: any) => ({ ...prev, city: _city }));
				break;
			}
			case 'website': {
				const _website = e.target.value || '';
				setError((prev) => ({ ...prev, website: !validator.isURL(_website.trim()) }));
				setUserInfo((prev: any) => ({ ...prev, website: _website }));
				break;
			}
			default:
				break;
		}
		setIsFormDirty(true);
	};

	useEffect(() => {
		if (!(user && user.id)) {
			router.push('/login');
		}
		// setUserInfo(user);
	}, [user, router]);

	if (!user) {
		return <PageLoader />;
	}

	return (
		<>
			<div className='pb-4 pt-10 flex justify-between items-center bg-white w-[700px] fixed z-50'>
				<Text className='text-3xl font-black'>Profile</Text>
			</div>

			<div className='w-[700px] my-28 flex flex-col gap-12'>
				<div className='flex flex-col rounded-2xl border overflow-hidden'>
					<Text className='!text-xl !font-bold p-8 bg-gray-300'>Personal Information</Text>
					<form className='flex flex-col gap-8 p-8' onSubmit={(e) => e.preventDefault()}>
						<div className='flex justify-between items-center'>
							<div className='group overflow-hidden w-44 h-44 bg-muted rounded-full flex justify-center items-center relative'>
								{userInfo?.profile_img ? (
									<Image
										objectFit='contain'
										layout='fill'
										className={cn('!rounded-full !w-44 !h-44 !absolute !top-0 !left-0 !z-10')}
										alt='img'
										src={userInfo.profile_img}
									/>
								) : (
									<Avatar className='w-44 h-44 absolute top-0 left-0 z-10'>
										<AvatarImage src={userInfo?.profile_img} />
										<AvatarFallback className='text-5xl font-bold'>
											{userInfo?.name
												?.match(/(\b\S)?/g)
												?.join('')
												?.match(/(^\S|\S$)?/g)
												?.join('')
												?.toUpperCase()}
										</AvatarFallback>
									</Avatar>
								)}
								<div
									onClick={() => document.getElementById('profile-image')?.click()}
									className='z-20 relative flex items-center justify-center cursor-pointer bg-black w-44 h-44 opacity-0 transition-all group-hover:opacity-100 group-hover:bg-opacity-80'
								>
									<TbPencil size={24} color='white' />
								</div>
							</div>
							<div className='flex flex-col gap-6'>
								<div>
									<Label htmlFor='name'>Username*</Label>
									<Input
										value={userInfo?.name}
										onChange={(e) => handleChange('name', e)}
										required
										placeholder='Enter name...'
										type='text'
										className='w-60'
									/>
								</div>
								<div>
									<Label htmlFor='email'>Email*</Label>
									<Input
										value={userInfo?.email}
										disabled
										onChange={(e) => handleChange('email', e)}
										required
										placeholder='Enter email...'
										type='email'
										className='w-60'
									/>
								</div>
							</div>
						</div>

						<div>
							<Label htmlFor='website'>Website</Label>
							<Input
								value={userInfo?.website}
								onChange={(e) => handleChange('website', e)}
								placeholder='Enter website...'
								type='text'
								className=''
							/>
						</div>
						<div>
							<Label htmlFor='city'>City</Label>
							<Input
								value={userInfo?.city}
								onChange={(e) => handleChange('city', e)}
								placeholder='Enter city...'
								className=''
							/>
						</div>
						<Button
							type='submit'
							onClick={handleUpdate}
							disabled={
								!isFormDirty ||
								error.name ||
								(userInfo?.website && error.website) ||
								(userInfo?.city && error.city) ||
								(userInfo?.profile_img && error.image)
							}
							className='w-fit'
						>
							{isSubmitting ? <BiLoaderAlt className='mr-2 h-4 w-4 animate-spin' /> : 'Update'}
						</Button>
					</form>
				</div>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger className='w-full' disabled>
							<div className='flex flex-col rounded-2xl border overflow-hidden opacity-50 cursor-default'>
								<Text className='!text-xl !font-bold p-8 bg-gray-300'>Delete Account</Text>
								<div className='flex flex-col gap-5 p-8'>
									<Text>Delete your account with all personal data.</Text>
									<Button disabled className='w-fit' variant={'destructive'}>
										Delete Account
									</Button>
								</div>
							</div>
						</TooltipTrigger>
						<TooltipContent className='text-base p-4'>Coming Soon!</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<input
				style={{ display: 'none' }}
				type='file'
				accept='.jpg, .jpeg, .png, .gif, .bmp'
				id='profile-image'
				ref={imageRef}
				onChange={async (event: any) => {
					const file = event.target.files[0];
					const profile_img = await file2Base64(file);
					setUserInfo((prev: any) => ({ ...prev, profile_img: profile_img, file }));
					setIsFormDirty(true);
				}}
			/>
		</>
	);
};

export default Profile;
