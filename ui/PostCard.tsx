import {
	Avatar,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	useDisclosure,
} from '@chakra-ui/react';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import Text from './Text';
import Tiptap from './Tiptap';
import { useRef, useState } from 'react';
import CreatePost from './CreatePost';
import { useDeletePost } from '@/queries/feed';
import { getRelativeTime } from '@/utils/misc';
import LikeIcon from '@/assets/icons/LikeIcon';
import clsx from 'clsx';
import { FaRegCommentDots } from 'react-icons/fa';

type PostCardProps = {
	post: any;
};

const PostCard = ({ post }: PostCardProps) => {
	const editorRef = useRef<any>();
	const deletePostMutation = useDeletePost();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [isLiked, setIsLiked] = useState(false);
	const [isCommentsOpen, setIsCommentsOpen] = useState(false);

	const postOptions = [
		{
			key: 'update',
			action: () => onOpen(),
			value: 'Update Post',
		},
		{
			key: 'delete',
			action: () => {
				deletePostMutation.mutate(post._id);
			},
			value: 'Delete Post',
		},
	];
	return (
		<div className='flex flex-col gap-6 px-6 py-4 rounded-lg border w-full max-w-[650px] shadow-md'>
			<div className='post-header flex items-center gap-4'>
				<Avatar size='sm' name={post.creator?.name} src={post.creator?.profile_img} />
				<div className='flex flex-col gap-1 flex-1'>
					<Text className='font-bold text-sm'>{post?.creator?.name}</Text>
					<Text className='text-neutral-500 text-xs'>{getRelativeTime(post?.updated_at)}</Text>
				</div>
				<Popover>
					<PopoverTrigger>
						<button>
							<IoEllipsisHorizontalSharp size={18} />
						</button>
					</PopoverTrigger>
					<PopoverContent className='w-auto overflow-hidden mx-2'>
						<PopoverArrow />
						<PopoverBody className='p-0 flex flex-col items-center w-auto rounded-xl'>
							{postOptions.map((option) => (
								<div key={option.key} className='px-6 py-3 border-b cursor-pointer' onClick={option.action}>
									{option.value}
								</div>
							))}
						</PopoverBody>
					</PopoverContent>
				</Popover>
			</div>
			<div className='rounded-lg bg-neutral-50 p-2'>
				<Tiptap
					isReadonly
					ref={editorRef}
					content={JSON.parse(post.rich_description)}
					defaultImage={{ image_url: post?.image_url || '', image_text: post?.image_text || '' }}
				/>
			</div>
			<div id='reactions' className='flex gap-6 items-center justify-between w-full'>
				<div
					className='flex gap-1 items-center group cursor-pointer select-none'
					onClick={() => setIsLiked((prev) => !prev)}
				>
					<LikeIcon
						filled={isLiked}
						className={clsx('group-hover:scale-125 transition')}
						color={isLiked ? 'blue' : undefined}
						size={16}
					/>
					<Text className='font-normal text-xs text-neutral-500'>Like</Text>
				</div>
				<div
					className='flex gap-1 items-center group cursor-pointer select-none'
					onClick={() => setIsCommentsOpen((prev) => !prev)}
				>
					<FaRegCommentDots size={16} className='fill-neutral-500 stroke-1' />
					<Text className='font-normal text-xs text-neutral-500'>Comments</Text>
				</div>
			</div>
			<div className={clsx(isCommentsOpen ? 'h-40' : 'h-0', 'w-full transition-height duration-200 ease-in-out')}></div>
			{isOpen && <CreatePost isOpen={isOpen} onClose={onClose} isEdit post={post} />}
		</div>
	);
};

export default PostCard;
