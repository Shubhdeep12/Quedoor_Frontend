import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import React, { FC, useRef, useState } from 'react';
import Tiptap from './Tiptap';
import { useCreatePost, useUpdatePost } from '@/queries/feed';
import { deleteAttachment, uploadAttachment } from '@/queries/misc';
import { PostProps } from '@/utils/constants';

type CreatePostProps = {
	isOpen: boolean;
	onClose: () => void;
	post?: PostProps;
	isEdit?: boolean;
};

const CreatePost: FC<CreatePostProps> = ({ isOpen, onClose, isEdit = false, post }) => {
	const editorRef = useRef<any>();
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
				} catch (error) {
					// Handle error
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
					}
				} catch (error) {
					// Handle error
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
		<Modal onClose={onClose} isOpen={isOpen} isCentered size='2xl'>
			<ModalOverlay />
			<ModalContent className='border-4 border-black rounded-xl overflow-hidden'>
				<ModalCloseButton />
				<ModalBody className='px-0 mt-8 py-0'>
					<Tiptap
						ref={editorRef}
						content={JSON.parse(post?.rich_description || '{}')}
						onChange={(val: any) => {
							val;
						}}
						isLoading={isLoading}
						handlePrimaryCTA={handlePrimaryCTA}
						defaultImage={{ image_url: post?.image_url || '', image_text: post?.image_text || '' }}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CreatePost;
