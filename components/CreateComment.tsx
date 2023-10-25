import React, { FC, useRef, useState } from 'react';

import { createComment, updateComment } from '@/queries/feed';
import { deleteAttachment, uploadAttachment } from '@/queries/misc';
import { CommentProps, PostProps } from '@/lib/constants';
import Tiptap from './Tiptap';
import { DialogContent } from '@/ui/dialog';

type CreateCommentProps = {
	onClose: () => void;
	post: PostProps;
	isEdit?: boolean;
	comment?: CommentProps;
	setComments: any;
};

const CreateComment: FC<CreateCommentProps> = ({ onClose, isEdit = false, post, comment, setComments }) => {
	const editorRef = useRef<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handlePrimaryCTA = async (currImage: { image_url: string; image_text: string; file?: any }) => {
		setIsLoading(true);

		let image_url = comment?.image_url || '';
		let image_text = comment?.image_text || '';
		try {
			if (comment?.image_url !== currImage?.image_url) {
				if (comment?.image_url && comment.image_url.length > 0 && isEdit)
					await deleteAttachment({ image_url: comment?.image_url });

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
					const res: { data: CommentProps } = await createComment(post?._id, payload);
					setComments((prev: CommentProps[]) => [res.data, ...prev]);
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
					if (comment?._id) {
						const res = await updateComment({ id: comment._id, body: payload });
						setComments((prev: CommentProps[]) =>
							prev.map((_comment: CommentProps) => {
								if (_comment._id === res.data._id) {
									return res.data;
								}
								return _comment;
							})
						);
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
		<DialogContent className='laptop:max-w-[650px] border-4 border-black rounded-xl overflow-hidden p-0 w-40 '>
			<Tiptap
				ref={editorRef}
				content={JSON.parse(comment?.rich_description || '{}')}
				onChange={(val: any) => {
					val;
				}}
				isLoading={isLoading}
				handlePrimaryCTA={handlePrimaryCTA}
				defaultImage={{ image_url: comment?.image_url || '', image_text: comment?.image_text || '' }}
			/>
		</DialogContent>
	);
};

export default CreateComment;
