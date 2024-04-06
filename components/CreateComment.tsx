import React, { FC, memo, useRef, useState } from 'react';

import { useCreateComment, useUpdateComment } from '@/queries/feed';
import { deleteAttachment, uploadAttachment } from '@/queries/misc';
import { CommentProps, PostProps } from '@/lib/constants';
import { Textarea } from '@/ui/textarea';
import { Button } from '@/ui/button';
import { RiImage2Fill } from 'react-icons/ri';
import { file2Base64 } from '@/lib/misc';
import { Dialog, DialogContent } from '@/ui/dialog';
import Image from 'next/image';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { BiLoaderAlt } from 'react-icons/bi';
import { useToast } from '@/ui/use-toast';

type CreateCommentProps = {
	post: PostProps;
	isEdit?: boolean;
	comment?: CommentProps;
	onClose?: () => void;
};

const CreateComment: FC<CreateCommentProps> = ({ isEdit = false, post, comment, onClose }) => {
	const imageRef = useRef<any>();
	const { toast } = useToast();
	const updateCommentMutation = useUpdateComment(post.id);
	const createCommentMutation = useCreateComment(post.id);
	const [imagePreview, setImagePreview] = useState(false);
	const [commentValue, setCommentValue] = useState<string | undefined>(comment?.description);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [image, setImage] = useState<{ imageUrl: string; file?: Blob; imageText: string }>({
		imageUrl: comment?.imageUrl || '',
		imageText: comment?.imageText || '',
		file: undefined,
	});

	const checkAddCommentDisabled = () => {
		if (!(image.imageUrl || image.file) && (commentValue || '').trim()?.length === 0) {
			return true;
		}
		return false;
	};

	const handleCommentValue = (e: any) => {
		setCommentValue(e.target.value);
	};

	const handlePrimaryCTA = async () => {
		setIsLoading(true);

		let imageUrl = comment?.imageUrl || '';
		let imageText = comment?.imageText || '';
		try {
			if (comment?.imageUrl !== image?.imageUrl) {
				if (comment?.imageUrl && comment.imageUrl.length > 0 && isEdit)
					await deleteAttachment({ imageUrl: comment?.imageUrl });

				if (image.imageUrl && image.file) {
					const data = new FormData();
					data.append('withImageText', 'true');
					data.append('image', image.file);
					const res = await uploadAttachment(data);
					if (res.status < 300) {
						imageText = res.result.imageText;
						imageUrl = res.result.imageUrl;
					}
				}
			}

			if (!isEdit) {
				const payload = {
					imageUrl,
					description: (commentValue || '').trim(),
					richDescription: (commentValue || '').trim(),
					imageText,
				};

				try {
					createCommentMutation.mutate({ postId: post?.id, body: payload });
					toast({
						title: 'Comment created successully.',
					});
				} catch (error) {
					// Handle error
					toast({
						title: 'Failed to create comment! Please try again.',
						variant: 'destructive',
					});
				}
			} else {
				const payload = {
					imageUrl,
					description: (commentValue || '').trim(),
					richDescription: (commentValue || '').trim(),
					imageText,
				};

				try {
					if (comment?.id) {
						updateCommentMutation.mutate({ id: comment.id, body: payload });
						toast({
							title: 'Comment updated successfully.',
						});
					}
				} catch (error) {
					toast({
						title: 'Failed to update comment! Please try again.',
						variant: 'destructive',
					});
				}
			}
			setImage({ imageUrl: '', imageText: '', file: undefined });
			setCommentValue('');
		} catch (e: any) {
			/* empty */
		} finally {
			setIsLoading(false);
			if (typeof onClose === 'function') onClose();
		}
	};

	return (
		<div className='flex gap-2 items-start flex-col p-2'>
			<Textarea
				autoFocus
				value={commentValue}
				onChange={handleCommentValue}
				rows={4}
				className='!max-h-[80px] resize-none rounded-lg'
				placeholder='Type your comment here.'
			/>
			<div className='flex gap-3 w-full'>
				<Button
					// disabled={image.imageUrl ? image.imageUrl.length > 0 : false}
					className='transition rounded-xl'
					onClick={(e) => {
						e.preventDefault();
						if (image.imageUrl || image.file) {
							setImagePreview(true);
						} else document.getElementById(isEdit ? 'tiptap-edit-comment-image' : 'tiptap-comment-image')?.click();
					}}
				>
					{!(image.imageUrl || image.file) ? (
						<RiImage2Fill size={18} />
					) : (
						<div className='flex items-center justify-between min-w-[80px] w-full '>
							<div className='bg-slate-300 rounded-md'>
								<Image
									objectFit='contain'
									layout='fill'
									className='!w-[25px] !h-[25px] !relative'
									alt='img'
									src={image.imageUrl}
								/>
							</div>

							<div
								className='cursor-pointer top-2 right-2 rounded-full'
								onClick={(e) => {
									e.stopPropagation();
									setImage({ imageUrl: '', imageText: '', file: undefined });
									setImagePreview(false);
								}}
							>
								<IoCloseCircleSharp size={24} />
							</div>
						</div>
					)}
				</Button>
				<Button
					className='flex-1 rounded-xl'
					disabled={isLoading || checkAddCommentDisabled()}
					onClick={handlePrimaryCTA}
				>
					{isLoading ? (
						<BiLoaderAlt className='mr-2 h-4 w-4 animate-spin' />
					) : isEdit ? (
						'Update Comment'
					) : (
						'Add Comment'
					)}
				</Button>

				{isEdit && (
					<Button className='p-2 rounded-xl' onClick={onClose}>
						<IoCloseCircleSharp size={24} />
					</Button>
				)}
			</div>

			<Dialog open={imagePreview} onOpenChange={() => setImagePreview(false)}>
				<DialogContent className='laptop:max-w-[800px]'>
					<Image
						objectFit='contain'
						layout='fill'
						className='!w-full !h-full !relative mt-2'
						alt='img'
						src={image.imageUrl}
					/>
				</DialogContent>
			</Dialog>

			<input
				style={{ display: 'none' }}
				type='file'
				accept='.jpg, .jpeg, .png, .gif, .bmp'
				id={isEdit ? 'tiptap-edit-comment-image' : 'tiptap-comment-image'}
				ref={imageRef}
				onChange={async (event: any) => {
					const file = event.target.files[0];
					const imageUrl = await file2Base64(file);
					setImage({
						imageUrl,
						imageText: '',
						file,
					});
				}}
			/>
		</div>
	);
};

export default memo(CreateComment);
