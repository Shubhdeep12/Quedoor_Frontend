import React, { FC, useRef, useState } from 'react';

import { PostProps } from '@/lib/constants';
import Tiptap from './Tiptap';
import { DialogContent } from '@/ui/dialog';

type CreatePostProps = {
	onClose: () => void;
	filter?: PostProps;
	setFilter: any;
};

const FilterPost: FC<CreatePostProps> = ({ onClose, filter, setFilter }) => {
	const editorRef = useRef<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handlePrimaryCTA = async (currImage: { image_url: string; image_text: string; file?: any }) => {
		setIsLoading(true);

		let image_url = filter?.image_url || '';
		if (image_url !== currImage.image_url) {
			image_url = currImage.image_url;
		}

		const filterData = {
			image_url,
			file: currImage.file,
			description: editorRef.current && editorRef.current.getText(),
			rich_description: JSON.stringify((editorRef.current && editorRef.current.getJSON()) || {}),
		};
		setFilter(filterData);

		setIsLoading(false);
		onClose();
	};
	return (
		<DialogContent className='laptop:max-w-[650px] border-4 border-black rounded-xl overflow-hidden p-0 w-40 '>
			<Tiptap
				ref={editorRef}
				content={JSON.parse(filter?.rich_description || '{}')}
				isLoading={isLoading}
				handlePrimaryCTA={handlePrimaryCTA}
				defaultImage={{ image_url: filter?.image_url || '', image_text: filter?.image_text || '' }}
				placeholder='Enter here to search...'
			/>
		</DialogContent>
	);
};

export default FilterPost;
