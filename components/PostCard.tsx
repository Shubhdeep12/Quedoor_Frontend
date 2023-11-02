'use client';

import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import Text from '../ui/Text';
import { memo, useRef, useState } from 'react';
import CreatePost from './CreatePost';
import { useDeletePost, useLikePost } from '@/queries/feed';
import { getRelativeTime } from '@/lib/misc';
import LikeIcon from '@/assets/icons/LikeIcon';
import clsx from 'clsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/dropdown-menu';
import { Dialog } from '@/ui/dialog';
import Tiptap from './Tiptap';
import useDebounce from '@/hooks/useDebounce';
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
import useAuth from '@/hooks/useAuth';
import Comments from './Comments';
import CommentIcon from '@/assets/icons/CommentIcon';

type PostCardProps = {
	post: any;
};

const PostCard = ({ post }: PostCardProps) => {
	const editorRef = useRef<any>();
	const deletePostMutation = useDeletePost();
	const likePostMutation = useLikePost();
	const { user } = useAuth();
	const [isLiked, setIsLiked] = useState<boolean>((post?.reactions || []).includes(post?.userId));
	const [isCommentsOpen, setIsCommentsOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

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

	const sendLikeRequest = async (val: boolean) => {
		likePostMutation.mutate({ postId: post._id, body: { like: val, dislike: !val }, userId: String(user.id) });
	};

	const debouncedSendLike = useDebounce(sendLikeRequest, 500);

	const handleLikeClick = () => {
		setIsLiked((prev) => !prev);
		debouncedSendLike(!isLiked);
	};

	const postOptions = [
		{
			key: 'update',
			action: () => setIsOpen(true),
			value: 'Update Post',
		},
		{
			key: 'delete',
			action: () => {
				setAlert({
					isOpen: true,
					header: 'Are you absolutely sure?',
					description: 'This action cannot be undone. This will permanently delete your post and comments.',
					action: () => {
						deletePostMutation.mutate(post._id);
					},
				});
			},
			value: 'Delete Post',
		},
	];

	return (
		<div className='flex flex-col gap-4 p-4 rounded-lg border w-full max-w-[650px] shadow-md'>
			<div className='post-header flex items-center gap-4'>
				<Avatar className='w-8 h-8'>
					<AvatarImage src={post?.creator?.profile_img} />
					<AvatarFallback className='text-sm'>
						{post?.creator.name
							.match(/(\b\S)?/g)
							.join('')
							.match(/(^\S|\S$)?/g)
							.join('')
							.toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col gap-1 flex-1'>
					<Text className='font-bold text-sm'>{post?.creator?.name}</Text>
					<Text className='text-neutral-500 text-xs'>{getRelativeTime(post?.updated_at)}</Text>
				</div>

				{user.id == post?.userId && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button>
								<IoEllipsisHorizontalSharp size={18} />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-auto overflow-hidden mx-2 p-0 rounded-xl'>
							{postOptions.map((option) => (
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

			<div className='rounded-lg bg-neutral-50 p-2'>
				<Tiptap
					isReadonly
					ref={editorRef}
					content={JSON.parse(post.rich_description)}
					defaultImage={{ image_url: post?.image_url || '', image_text: post?.image_text || '' }}
				/>
			</div>

			<div className='flex gap-6 items-end mt-2'>
				<div className='flex gap-2 items-center group cursor-pointer select-none' onClick={handleLikeClick}>
					<LikeIcon
						filled={isLiked}
						className={clsx('group-hover:scale-125 transition')}
						color={isLiked ? 'red' : undefined}
						size={20}
					/>
					<Text className='font-normal text-xs'>{(post.reactions || []).length}</Text>
				</div>

				<CommentIcon
					size={21}
					className='cursor-pointer select-none'
					onClick={() => setIsCommentsOpen((prev) => !prev)}
				/>
			</div>

			{isCommentsOpen && <Comments isCommentsOpen={isCommentsOpen} post={post} />}

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<CreatePost isEdit post={post} onClose={() => setIsOpen(false)} />
			</Dialog>

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
	);
};

export default memo(PostCard);
