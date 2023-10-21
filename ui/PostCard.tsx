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
import { useRef } from 'react';
import CreatePost from './CreatePost';
import { useDeletePost } from '@/queries/feed';

type PostCardProps = {
	post: any;
};

const PostCard = ({ post }: PostCardProps) => {
	const editorRef = useRef<any>();
	const deletePost = useDeletePost();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const postOptions = [
		{
			key: 'update',
			action: () => onOpen(),
			value: 'Update Post',
		},
		{
			key: 'delete',
			action: () => {
				deletePost.mutate(post._id);
			},
			value: 'Delete Post',
		},
	];
	return (
		<div className='flex flex-col gap-4 p-6 rounded-md border w-full max-w-[650px]'>
			<div className='post-header flex items-center gap-4'>
				<Avatar size='sm' name={post.creator?.name} src={post.creator?.profileImg} />
				<div className='flex flex-col gap-1 flex-1'>
					<Text className='font-bold text-sm'>{post?.creator?.name}</Text>
					<Text className='text-neutral-500 text-xs'>2 mins ago</Text>
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
			<Tiptap isReadonly ref={editorRef} content={JSON.parse(post.rich_description)} />
			<CreatePost isOpen={isOpen} onClose={onClose} isEdit post={post} />
		</div>
	);
};

export default PostCard;
