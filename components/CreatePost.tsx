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
import React, { FC } from 'react';
// import Tiptap from './Tiptap';

type CreatePostProps = {
	isOpen: boolean;
	onClose: () => void;
};

const CreatePost: FC<CreatePostProps> = ({ isOpen, onClose }) => {
	return (
		<Modal onClose={onClose} isOpen={isOpen} isCentered size='3xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader className='border-b font-bold'>Create Post</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{/* <Tiptap /> */}</ModalBody>
				<ModalFooter className='border-t'>
					<Button onClick={onClose}>Close</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CreatePost;
