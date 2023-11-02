import React, { FC, useRef, useState } from 'react';

import { PostProps } from '@/lib/constants';
import Tiptap from './Tiptap';
import { DialogContent } from '@/ui/dialog';

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
				rich_description: JSON.stringify((editorRef.current && editorRef.current.getJSON()) || {}),
				image_text: currImage.image_text || '',
			};
		} catch (e: any) {
			/* empty */
		} finally {
			setIsLoading(false);
			onClose();
		}
	};
	return (
		<DialogContent className='laptop:max-w-[650px] border-4 border-black rounded-xl overflow-hidden p-0 w-40 '>
			<Tiptap ref={editorRef} isLoading={isLoading} handlePrimaryCTA={handlePrimaryCTA} />
		</DialogContent>
	);
};

export default Filter;
