import React, { FC, useRef, useState } from 'react';

import { useCreatePost, useUpdatePost } from '@/queries/feed';
import { deleteAttachment, uploadAttachment } from '@/queries/misc';
import { PostProps } from '@/lib/constants';
import Tiptap from './Tiptap';
import { DialogContent } from '@/ui/dialog';
import { useToast } from '@/ui/use-toast';

type CreatePostProps = {
	onClose: () => void;
	post?: PostProps;
	isEdit?: boolean;
};

const CreatePost: FC<CreatePostProps> = ({ onClose, isEdit = false, post }) => {
	const editorRef = useRef<any>();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const createMutation = useCreatePost();
	const updateMutation = useUpdatePost();

	const handlePrimaryCTA = async (currImage: { image_url: string; image_text: string; file?: any }) => {
		setIsLoading(true);

		let image_url = post?.image_url || '';
		let image_text = post?.image_text || '';
		try {
			if (post?.image_url !== currImage?.image_url) {
				if (post?.image_url && post.image_url.length > 0 && isEdit)
					await deleteAttachment({ image_url: post?.image_url });

				if (currImage.image_url) {
					const data = new FormData();
					data.append('with_image_text', 'true');
					data.append('image', currImage.file);
					const res = await uploadAttachment(data);
					if (res.status < 300) {
						image_text = res.result.image_text;
						image_url = res.result.image_url;
					}
				}
			}

			if (!isEdit) {
				const payload = {
					image_url,
					description: editorRef.current && editorRef.current.getText(),
					rich_description: JSON.stringify((editorRef.current && editorRef.current.getJSON()) || {}),
					image_text,
				};

				try {
					createMutation.mutate(payload);
					toast({
						title: 'Post created successfully.',
					});
				} catch (error) {
					// Handle error
					toast({
						title: 'Failed to create post! Please try again.',
						variant: 'destructive',
					});
				}
			} else {
				const payload = {
					image_url,
					description: editorRef.current && editorRef.current.getText(),
					rich_description: JSON.stringify((editorRef.current && editorRef.current.getJSON()) || {}),
					image_text,
				};

				try {
					if (post?._id) {
						updateMutation.mutate({ id: post?._id, body: payload });
						toast({
							title: 'Post updated successfully.',
						});
					}
				} catch (error) {
					// Handle error
					toast({
						title: 'Failed to updated post! Please try again.',
						variant: 'destructive',
					});
				}
			}
		} catch (e: any) {
			/* empty */
		} finally {
			setIsLoading(false);
			onClose();
		}
	};
	return (
		<DialogContent className='laptop:max-w-[650px] border-4 border-black rounded-xl overflow-hidden p-0 w-40 '>
			<Tiptap
				ref={editorRef}
				content={JSON.parse(post?.rich_description || '{}')}
				isLoading={isLoading}
				handlePrimaryCTA={handlePrimaryCTA}
				defaultImage={{ image_url: post?.image_url || '', image_text: post?.image_text || '' }}
			/>
		</DialogContent>
	);
};

export default CreatePost;
