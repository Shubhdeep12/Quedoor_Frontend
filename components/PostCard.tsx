import { Avatar } from '@chakra-ui/react';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import Text from './Text';
import Tiptap from './Tiptap';
import { useRef } from 'react';

type PostCardProps = {
	post: any;
};

const PostCard = ({ post }: PostCardProps) => {
	const editorRef = useRef<any>();
	const { user } = post;
	return (
		<div className='flex flex-col gap-4 p-6 rounded-md border w-full max-w-[650px]'>
			<div className='post-header flex items-center gap-4'>
				<Avatar size='sm' name={user?.name} src={user?.profileImg} />
				<div className='flex flex-col gap-1 flex-1'>
					<Text className='font-bold text-sm'>{post.user.name}</Text>
					<Text className='text-neutral-500 text-xs'>2 mins ago</Text>
				</div>
				<IoEllipsisHorizontalSharp size={18} />
			</div>
			<Tiptap isReadonly ref={editorRef} content={JSON.parse(post.rich_description)} />
			{/* {post.description} */}
		</div>
	);
};

export default PostCard;
