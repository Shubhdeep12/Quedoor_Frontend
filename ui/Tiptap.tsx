'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { Fragment, forwardRef, useRef, useState } from 'react';
import { AiOutlineBold, AiOutlineItalic } from 'react-icons/ai';
import { LuHeading1, LuHeading2 } from 'react-icons/lu';
import { RiCodeView, RiImage2Fill, RiListOrdered2, RiListUnordered, RiSeparator } from 'react-icons/ri';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { Button } from '@chakra-ui/react';
import { IoCloseCircleSharp, IoSend } from 'react-icons/io5';
import Image from 'next/image';

const MenuItem = ({ Icon, title, action, isActive = null, disabled = false }: any) => (
	<button
		className={clsx({
			'rounded-lg p-1 transition hover:bg-gray-400 hover:bg-opacity-50': true,
			'bg-gray-400 bg-opacity-50': isActive(),
			'cursor-default': disabled,
		})}
		onClick={() => !disabled && action()}
		title={title}
	>
		<Icon size='22' color='white' />
	</button>
);

const MenuBar = ({ editor, isLoading, handlePrimaryCTA, image_url }: any) => {
	const items = [
		{
			Icon: AiOutlineBold,
			title: 'Bold',
			action: () => editor.chain().focus().toggleBold().run(),
			isActive: () => editor.isActive('bold'),
		},
		{
			Icon: AiOutlineItalic,
			title: 'Italic',
			action: () => editor.chain().focus().toggleItalic().run(),
			isActive: () => editor.isActive('italic'),
		},

		{
			Icon: RiCodeView,
			title: 'Code',
			action: () => editor.chain().focus().toggleCode().run(),
			isActive: () => editor.isActive('code'),
		},
		{
			type: 'divider',
		},
		{
			Icon: LuHeading1,
			title: 'Heading 1',
			action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
			isActive: () => editor.isActive('heading', { level: 1 }),
		},
		{
			Icon: LuHeading2,
			title: 'Heading 2',
			action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
			isActive: () => editor.isActive('heading', { level: 2 }),
		},

		{
			Icon: RiListUnordered,
			title: 'Bullet List',
			action: () => editor.chain().focus().toggleBulletList().run(),
			isActive: () => editor.isActive('bulletList'),
		},
		{
			Icon: RiListOrdered2,
			title: 'Ordered List',
			action: () => editor.chain().focus().toggleOrderedList().run(),
			isActive: () => editor.isActive('orderedList'),
		},
		{
			type: 'divider',
		},
		{
			Icon: RiSeparator,
			title: 'Horizontal Rule',
			action: () => editor.chain().focus().setHorizontalRule().run(),
			isActive: () => false,
		},

		{
			Icon: RiImage2Fill,
			title: 'Upload Image',
			action: () => document.getElementById('tiptap-image')?.click(),
			isActive: () => image_url && image_url.length > 0,
			disabled: image_url && image_url.length > 0,
		},
	];

	return (
		<div className='flex gap-2 items-center justify-between flex-wrap bg-primary-light-500 px-2 py-2 relative'>
			<div className='flex gap-2 items-center '>
				{items.map((item, index) => (
					<Fragment key={index}>
						{item.type === 'divider' ? (
							<div className='divider bg-primary-light-50 h-6 mx-3 w-[1px]' />
						) : (
							<MenuItem {...item} />
						)}
					</Fragment>
				))}
			</div>

			<Button
				className='bg-primary-light-400 transition  hover:bg-opacity-90 flex items-center'
				colorScheme='bg-primary-light-400'
				variant='solid'
				rounded='base'
				size='sm'
				isLoading={isLoading}
				onClick={handlePrimaryCTA}
			>
				<IoSend size={20} color='white' />
			</Button>
		</div>
	);
};

const file2Base64 = (file: File): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result?.toString() || '');
		reader.onerror = (error) => reject(error);
	});
};

// eslint-disable-next-line react/display-name
const Tiptap = forwardRef(
	({ isReadonly = false, content = null, defaultImage = {}, onChange, isLoading, handlePrimaryCTA }: any, ref: any) => {
		const imageRef = useRef<any>();
		const [image, setImage] = useState<{ image_url: string; file?: Blob; image_text: string }>({
			image_url: defaultImage.image_url,
			image_text: defaultImage.image_text,
		});
		const editor = useEditor({
			extensions: [
				StarterKit,
				Highlight,
				Placeholder.configure({
					placeholder: 'Write something …',
				}),
				CharacterCount.configure({
					limit: 1000,
				}),
			],
			...(isReadonly ? {} : { autofocus: 'end' }),
			content: content,
			editable: !isReadonly,
			editorProps: {
				attributes: {
					class: clsx(
						'prose dark:prose-invert prose-sm transition sm:prose-base overflow-hidden lg:prose-lg xl:prose-2xl mx-1 px-2 focus:outline-none',
						!isReadonly && 'h-96'
					),
				},
			},
			onUpdate({ editor }) {
				onChange(editor.getJSON());
			},
		});

		ref.current = editor;
		return (
			<div className='editor-container h-auto overflow-hidden flex flex-col justify-between '>
				<EditorContent editor={editor} />
				{editor && !isReadonly && (
					<input
						style={{ display: 'none' }}
						type='file'
						id='tiptap-image'
						ref={imageRef}
						onChange={async (event: any) => {
							const file = event.target.files[0];
							const image_url = await file2Base64(file);
							setImage({
								image_url,
								image_text: '',
								file,
							});
						}}
					/>
				)}

				{image.image_url && (
					<div className='flex justify-center border-2 relative border-black m-4 rounded-lg'>
						<Image
							objectFit='contain'
							layout='fill'
							className='!w-full !h-[250px] !relative'
							alt='img'
							src={image.image_url}
						/>
						{!isReadonly && (
							<div
								className='absolute cursor-pointer top-2 right-2 rounded-full bg-white'
								onClick={() => setImage({ image_url: '', image_text: '' })}
							>
								<IoCloseCircleSharp size={20} />
							</div>
						)}
					</div>
				)}
				{editor && !isReadonly && (
					<MenuBar
						editor={editor}
						image_url={image.image_url}
						isLoading={isLoading}
						handlePrimaryCTA={() => handlePrimaryCTA(image)}
					/>
				)}
			</div>
		);
	}
);

export default Tiptap;
