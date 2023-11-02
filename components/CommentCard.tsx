import useAuth from '@/hooks/useAuth';
import { CommentProps, PostProps } from '@/lib/constants';
import { getRelativeTime } from '@/lib/misc';
import Text from '@/ui/Text';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '@/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import Image from 'next/image';
import React, { memo, useState } from 'react';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import CreateComment from './CreateComment';

type CommentCardProps = {
	comment: CommentProps;
	post: PostProps;
};

const CommentCard = ({ comment, post }: CommentCardProps) => {
	const { user } = useAuth();
	const [isEditMode, setIsEditMode] = useState(false);

	const commentOptions = [
		{
			key: 'update',
			action: () => setIsEditMode(true),
			value: 'Update Comment',
		},
		{
			key: 'delete',
			action: () => {
				// setAlert({
				// 	isOpen: true,
				// 	header: 'Are you absolutely sure?',
				// 	description:
				// 		'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
				// 	action: () => {
				// 		deletePostMutation.mutate(post._id);
				// 	},
				// });
			},
			value: 'Delete Comment',
		},
	];
	return !isEditMode ? (
		<div key={comment?._id} className='w-full border p-4 rounded-md flex flex-col gap-4'>
			<div className='comment-header flex items-center gap-4'>
				<Avatar className='w-6 h-6'>
					<AvatarImage src={comment?.creator?.profile_img} />
					<AvatarFallback className='text-xs'>
						{comment.creator.name
							.match(/(\b\S)?/g)
							.join('')
							.match(/(^\S|\S$)?/g)
							.join('')
							.toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col gap-1 flex-1'>
					<Text className='font-bold text-xs'>{comment?.creator?.name}</Text>
					<Text className='text-neutral-500 text-[10px]'>{getRelativeTime(comment?.updated_at)}</Text>
				</div>

				{user.id == comment?.userId && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button>
								<IoEllipsisHorizontalSharp size={14} />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-auto overflow-hidden mx-2 p-0 rounded-xl'>
							{commentOptions.map((option) => (
								<DropdownMenuItem
									key={option.key}
									className='px-6 py-3 border-b cursor-pointer'
									onClick={option.action}
								>
									{option.value}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>

			{comment.description && (
				<div className='bg-neutral-200 rounded-md p-2'>
					<Text className='text-xs '>{comment.description}</Text>
				</div>
			)}

			{comment.image_url && (
				<Dialog>
					<DialogTrigger asChild>
						<div className='w-fit rounded-md p-2'>
							<Image
								objectFit='contain'
								layout='fill'
								className='!w-[100px] !h-fit rounded-lg !relative'
								alt='img'
								src={String(comment.image_url)}
							/>
						</div>
					</DialogTrigger>
					<DialogContent className='laptop:max-w-[800px]'>
						<Image
							objectFit='contain'
							layout='fill'
							className='!w-full !h-full !relative mt-2'
							alt='img'
							src={String(comment.image_url)}
						/>
					</DialogContent>
				</Dialog>
			)}
		</div>
	) : (
		<CreateComment post={post} comment={comment} onClose={() => setIsEditMode(false)} isEdit />
	);
};

export default memo(CommentCard);
