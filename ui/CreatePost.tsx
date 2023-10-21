import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import React, { FC, useRef, useState } from 'react';
import Tiptap from './Tiptap';
import { useCreatePost, useUpdatePost } from '@/queries/feed';

type CreatePostProps = {
	isOpen: boolean;
	onClose: () => void;
	post?: object;
	isEdit?: boolean;
};

const CreatePost: FC<CreatePostProps> = ({ isOpen, onClose, isEdit = false, post }) => {
	const editorRef = useRef<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const createMutation = useCreatePost();
	const updateMutation = useUpdatePost();
	const handlePrimaryCTA = async () => {
		setIsLoading(true);

		if (!isEdit) {
			const payload = {
				image_url: '',
				description: editorRef.current && editorRef.current.getText(),
				rich_description: JSON.stringify((editorRef.current && editorRef.current.getJSON()) || {}),
				image_text: '',
			};

			try {
				createMutation.mutate(payload);
				// Handle successful creation, e.g., clear the form
			} catch (error) {
				// Handle error, e.g., show an error message
			}
		} else {
			const payload = {
				image_url: post?.image_url || '',
				description: editorRef.current && editorRef.current.getText(),
				rich_description: JSON.stringify((editorRef.current && editorRef.current.getJSON()) || {}),
				image_text: '',
			};

			try {
				updateMutation.mutate({ id: post?._id, body: payload });
				// Handle successful creation, e.g., clear the form
			} catch (error) {
				// Handle error, e.g., show an error message
			}
		}
		setIsLoading(false);
		onClose();
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
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CreatePost;
