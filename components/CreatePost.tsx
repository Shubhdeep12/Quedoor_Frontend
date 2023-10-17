/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import React, { FC, useRef, useState } from 'react';
import Tiptap from './Tiptap';
import { createPost } from '@/queries/feed';
// import Tiptap from './Tiptap';

type CreatePostProps = {
	isOpen: boolean;
	onClose: () => void;
	content?: string;
	isEdit?: boolean;
};

const CreatePost: FC<CreatePostProps> = ({ isOpen, onClose, isEdit = false, content = null }) => {
	const editorRef = useRef<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handlePrimaryCTA = async () => {
		// setIsLoading(true);
		console.log(editorRef.current && editorRef.current.getJSON());
		console.log(editorRef.current && editorRef.current.getText());

		if (!isEdit) {
			const payload = {
				image_url: '',
				description: editorRef.current && editorRef.current.getText(),
				rich_description: JSON.stringify((editorRef.current && editorRef.current.getJSON()) || {}),
				image_text: '',
			};

			const res = await createPost(payload);
			console.log({ res });
		}
		setIsLoading(false);
		onClose();
	};
	return (
		<Modal onClose={onClose} isOpen={isOpen} isCentered size='2xl'>
			<ModalOverlay />
			<ModalContent className='border-4 border-black'>
				{/* <ModalHeader className='border-b text-base font-bold py-3 px-4'>
					{isEdit ? 'Edit Post' : 'Create Post'}
				</ModalHeader> */}
				<ModalCloseButton />
				<ModalBody className='px-0 mt-8 py-0'>
					<Tiptap ref={editorRef} content={content} onChange={(val: any) => console.log({ val })} />
				</ModalBody>
				{/* <ModalFooter className='border-t'>
					<Button
						className='bg-primary-light-400 transition hover:bg-opacity-75 flex items-center'
						colorScheme='bg-primary-light-400'
						variant='solid'
						isLoading={isLoading}
						onClick={handlePrimaryCTA}
					>
						{isEdit ? 'Update Post' : 'Publish Post'}
					</Button>
				</ModalFooter> */}
			</ModalContent>
		</Modal>
	);
};

export default CreatePost;
