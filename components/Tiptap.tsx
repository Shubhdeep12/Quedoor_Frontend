/* eslint-disable react/display-name */
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { Fragment, forwardRef, useRef } from 'react';
import { AiOutlineBold, AiOutlineItalic } from 'react-icons/ai';
import { LuHeading1, LuHeading2 } from 'react-icons/lu';
import { RiCodeView, RiImage2Fill, RiListOrdered2, RiListUnordered, RiSeparator } from 'react-icons/ri';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Image from '@tiptap/extension-image';

const MenuItem = ({ Icon, title, action, isActive = null }: any) => (
	<button
		className={clsx({
			'rounded-lg p-1 transition hover:bg-gray-300 hover:bg-opacity-50': true,
			'bg-gray-300 bg-opacity-50': isActive(),
		})}
		onClick={action}
		title={title}
	>
		<Icon size='22' color='black' />
	</button>
);

const MenuBar = ({ editor }: any) => {
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
			isActive: () => false,
		},
	];

	return (
		<div className='flex gap-2 items-center flex-wrap px-2  border-t py-4 relative'>
			{items.map((item, index) => (
				<Fragment key={index}>
					{item.type === 'divider' ? <div className='divider bg-black h-7 mx-3 w-[1px]' /> : <MenuItem {...item} />}
				</Fragment>
			))}
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

const Tiptap = forwardRef(({ isReadonly = false, content = null, onChange }: any, ref: any) => {
	const imageRef = useRef<any>();
	const editor = useEditor({
		extensions: [
			StarterKit,
			Highlight,
			Placeholder.configure({
				placeholder: 'Write something …',
			}),
			Image.configure({
				allowBase64: true,
			}),
			CharacterCount.configure({
				limit: 1000,
			}),
		],
		autofocus: 'end',
		content,
		editable: !isReadonly,
		editorProps: {
			attributes: {
				class:
					'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl h-80 mx-1 px-2 focus:outline-none overflow-auto',
			},
		},
		onUpdate({ editor }) {
			onChange(editor.getJSON());
		},
	});

	ref.current = editor;

	return (
		<div className='editor-container h-96 overflow-hidden flex flex-col justify-between '>
			<EditorContent editor={editor} />
			<input
				style={{ display: 'none' }}
				type='file'
				id='tiptap-image'
				ref={imageRef}
				onChange={async (event: any) => {
					const file = event.target.files[0];

					editor
						?.chain()
						.focus()
						.setImage({ src: await file2Base64(file) })
						.run();
				}}
			/>
			{editor && <MenuBar editor={editor} imageRef={imageRef} />}

			{/* <Button onClick={() => console.log({ val: editor?.getJSON(), text: editor?.getText() })}>click</Button> */}
		</div>
	);
});

export default Tiptap;
