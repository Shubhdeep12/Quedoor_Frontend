import React, { FC, useRef, useState } from 'react';

import { PostProps } from '@/lib/constants';
import Tiptap from './Tiptap';
import { DialogContent } from '@/ui/dialog';
import api from '@/lib/api';

type CreatePostProps = {
	onClose: () => void;
	post?: PostProps;
	isEdit?: boolean;
};

const Filter: FC<CreatePostProps> = ({ onClose }) => {
	const editorRef = useRef<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handlePrimaryCTA = async (currImage: { image_url: string; image_text: string; file?: any }) => {
		setIsLoading(true);

		try {
			const payload = {
				image_url: currImage.image_url || '',
				description: editorRef.current && editorRef.current.getText(),
			};

			let data;
			if (currImage.image_url || payload.description) {
				data = new FormData();
				data.append('description', payload.description);
				data.append('image', currImage.file);
				await api.post('/filter/posts', data);
			}

			setIsLoading(false);
			onClose();
		} catch (e: any) {
			/* empty */
			setIsLoading(false);
		}
	};
	return (
		<DialogContent className='laptop:max-w-[650px] border-4 border-black rounded-xl overflow-hidden p-0 w-40 '>
			<Tiptap
				placeholder='Enter content to find similar posts'
				ref={editorRef}
				isLoading={isLoading}
				handlePrimaryCTA={handlePrimaryCTA}
			/>
		</DialogContent>
	);
};

export default Filter;
