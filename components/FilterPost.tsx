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

	const handlePrimaryCTA = async (currImage: { imageUrl: string; imageText: string; file?: any }) => {
		setIsLoading(true);

		let imageUrl = filter?.imageUrl || '';
		if (imageUrl !== currImage.imageUrl) {
			imageUrl = currImage.imageUrl;
		}

		const filterData = {
			imageUrl,
			file: currImage.file,
			description: editorRef.current && editorRef.current.getText(),
			richDescription: JSON.stringify((editorRef.current && editorRef.current.getJSON()) || {}),
		};
		setFilter(filterData);

		setIsLoading(false);
		onClose();
	};
	return (
		<DialogContent className='laptop:max-w-[650px] border-4 border-black rounded-xl overflow-hidden p-0 w-40 '>
			<Tiptap
				ref={editorRef}
				content={JSON.parse(filter?.richDescription || '{}')}
				isLoading={isLoading}
				handlePrimaryCTA={handlePrimaryCTA}
				defaultImage={{ imageUrl: filter?.imageUrl || '', imageText: filter?.imageText || '' }}
				placeholder='Enter here to search...'
			/>
		</DialogContent>
	);
};

export default FilterPost;
