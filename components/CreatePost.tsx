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

	const handlePrimaryCTA = async (currImage: { imageUrl: string; imageText: string; file?: any }) => {
		setIsLoading(true);
		let imageUrl = post?.imageUrl || '';
		let imageText = post?.imageText || '';
		try {
			if (post?.imageUrl !== currImage?.imageUrl) {
				if (post?.imageUrl && post.imageUrl.length > 0 && isEdit)
					await deleteAttachment({ imageUrl: post?.imageUrl });

				if (currImage.imageUrl) {
					const data = new FormData();
					data.append('withImageText', 'true');
					data.append('image', currImage.file);
					const res = await uploadAttachment(data);
					if (res.status < 300) {
						imageText = res.result.imageText;
						imageUrl = res.result.imageUrl;
					}
				}
			}

			if (!isEdit) {
				const payload = {
					imageUrl,
					description: editorRef.current && editorRef.current.getText(),
					richDescription: JSON.stringify((editorRef.current && editorRef.current.getJSON()) || {}),
					imageText,
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
					imageUrl,
					description: editorRef.current && editorRef.current.getText(),
					richDescription: JSON.stringify((editorRef.current && editorRef.current.getJSON()) || {}),
					imageText,
				};

				try {
					if (post?.id) {
						updateMutation.mutate({ id: post?.id, body: payload });
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
		} catch (error: any) {
			/* empty */
			console.log({error})
		} finally {
			setIsLoading(false);
			onClose();
		}
	};
	return (
		<DialogContent className='laptop:max-w-[650px] border-4 border-black rounded-xl overflow-hidden p-0 w-40 '>
			<Tiptap
				ref={editorRef}
				content={JSON.parse(post?.richDescription || '{}')}
				isLoading={isLoading}
				handlePrimaryCTA={handlePrimaryCTA}
				defaultImage={{ imageUrl: post?.imageUrl || '', imageText: post?.imageText || '' }}
			/>
		</DialogContent>
	);
};

export default CreatePost;
