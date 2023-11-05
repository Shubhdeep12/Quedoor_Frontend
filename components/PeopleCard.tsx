'use client';

import useAuth from '@/hooks/useAuth';
import { UserProps } from '@/lib/constants';
import { getRandomBGColor } from '@/lib/misc';
import { followUser, unFollowUser } from '@/queries/people';
import Text from '@/ui/Text';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { useToast } from '@/ui/use-toast';
import clsx from 'clsx';
import { memo, useRef, useState } from 'react';

const PeopleCard = ({ user, activeListType }: { user: UserProps; activeListType: string }) => {
	const { toast } = useToast();
	const bgColor = useRef(getRandomBGColor());
	const [userData, setUserData] = useState(user);
	const { user: currentUser } = useAuth();
	const getButtonLabel = () => {
		return userData.followers?.includes(Number(currentUser?.id)) ? 'Unfollow' : 'Follow';
	};

	const handleActionBtn = async () => {
		const payload = {
			follower_id: currentUser?.id,
			following_id: user?.id,
		};
		if (userData.followers?.includes(Number(currentUser?.id))) {
			const res = await unFollowUser(payload);
			if (res.status <= 300) {
				setUserData((prev) => ({
					...prev,
					followers: (prev.followers || [])?.filter((id: number) => id !== Number(currentUser?.id)),
				}));
				toast({
					title: 'User unfollowed successfully.',
				});
			} else {
				toast({
					title: 'Failed to unfollow user! Please try again.',
					variant: 'destructive',
				});
			}
		} else {
			const res = await followUser(payload);
			if (res.status <= 300) {
				setUserData((prev) => ({
					...prev,
					followers: [...(prev.followers || []), Number(currentUser?.id)],
				}));
				toast({
					title: 'User followed successfully.',
				});
			} else {
				toast({
					title: 'Failed to follow user! Please try again.',
					variant: 'destructive',
				});
			}
		}
	};
	return (
		<div className={clsx(bgColor.current, 'flex justify-between items-center rounded-xl p-6')}>
			<div className='flex gap-2 items-center'>
				<Avatar className='w-12 h-12'>
					<AvatarImage src={user?.profile_img} />
					<AvatarFallback className='text-xs'>
						{user?.name
							?.match(/(\b\S)?/g)
							?.join('')
							?.match(/(^\S|\S$)?/g)
							?.join('')
							?.toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<Text className='font-bold text-lg'>{user?.name}</Text>
			</div>

			{currentUser?.id !== userData.id && activeListType === 'all' && (
				<Button variant={'outline'} onClick={handleActionBtn}>
					{getButtonLabel()}
				</Button>
			)}
		</div>
	);
};

export default memo(PeopleCard);
