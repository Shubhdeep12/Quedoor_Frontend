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
import { useDeleteComment } from '@/queries/feed';
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

type CommentCardProps = {
	comment: CommentProps;
	post: PostProps;
	isEditMode?: boolean;
	setEditMode?: any;
};

const CommentCard = ({ comment, post, isEditMode, setEditMode }: CommentCardProps) => {
	const { user } = useAuth();
	const { toast } = useToast();
	const deleteCommentMutation = useDeleteComment(post.id);
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

	const commentOptions = [
		{
			key: 'update',
			action: () => setEditMode(comment.id),
			value: 'Update Comment',
		},
		{
			key: 'delete',
			action: () => {
				setAlert({
					isOpen: true,
					header: 'Are you absolutely sure?',
					description: 'This action cannot be undone. This will permanently delete the comment.',
					action: () => {
						try {
							deleteCommentMutation.mutate(comment.id);
							toast({
								title: 'Comment deleted successfully.',
							});
						} catch (error) {
							toast({
								title: 'Failed to delete comment! Please try again.',
								variant: 'destructive',
							});
						}
					},
				});
			},
			value: 'Delete Comment',
		},
	];

	return !isEditMode ? (
		<div key={comment?.id} className='w-full border border-black p-4 rounded-3xl flex flex-col gap-4 '>
			<div className='comment-header flex items-center gap-2'>
				<Avatar className='w-8 h-8'>
					<AvatarImage src={comment?.creator?.profileImg} />
					<AvatarFallback className='text-xs'>
						{comment?.creator?.name
							?.match(/(\b\S)?/g)
							?.join('')
							?.match(/(^\S|\S$)?/g)
							?.join('')
							?.toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col gap-1 flex-1'>
					<Text className='font-bold text-xs'>{comment?.creator?.name}</Text>
					<Text className='text-neutral-500 text-[10px]'>{getRelativeTime(comment?.updatedAt)}</Text>
				</div>

				{user?.id == comment?.userId && (
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
				<div className=''>
					<Text className='text-xs font-bold'>{comment.description}</Text>
				</div>
			)}

			{comment.imageUrl && (
				<Dialog>
					<DialogTrigger asChild>
						<Image
							objectFit='contain'
							layout='fill'
							className='!w-[100px] !h-[auto] !relative !rounded-lg '
							alt='img'
							src={String(comment.imageUrl)}
						/>
					</DialogTrigger>
					<DialogContent className='laptop:max-w-[800px]'>
						<Image
							objectFit='contain'
							layout='fill'
							className='!w-full !h-full !relative mt-2'
							alt='img'
							src={String(comment.imageUrl)}
						/>
					</DialogContent>
				</Dialog>
			)}

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
	) : (
		<CreateComment post={post} comment={comment} onClose={() => setEditMode(null)} isEdit />
	);
};

export default memo(CommentCard);
