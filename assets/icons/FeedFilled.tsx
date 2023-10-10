import { FC } from 'react';
import { IconProps } from '.';

const FeedFilled: FC<IconProps> = ({
	height = 24,
	width = 24,
	size = 24,
	className = '',
	color = '#737373',
	...props
}) => {
	return (
		<svg
			width={size || width}
			height={size || height}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M7 10C7 9.17157 7.67157 8.5 8.5 8.5H11.5C12.3284 8.5 13 9.17157 13 10C13 10.8284 12.3284 11.5 11.5 11.5H8.5C7.67157 11.5 7 10.8284 7 10Z'
				fill={color}
				className={className}
			/>
			<path
				fillRule='evenodd'
				clip-rule='evenodd'
				d='M3 5.5V18.5C3 19.6046 3.89543 20.5 5 20.5H17L17.0012 7H17V5.5C17 4.39543 16.1046 3.5 15 3.5H5C3.89543 3.5 3 4.39543 3 5.5ZM8.5 7.5C7.11929 7.5 6 8.61929 6 10C6 11.3807 7.11929 12.5 8.5 12.5H11.5C12.8807 12.5 14 11.3807 14 10C14 8.61929 12.8807 7.5 11.5 7.5H8.5ZM6.5 15.5C6.22386 15.5 6 15.7239 6 16C6 16.2761 6.22386 16.5 6.5 16.5H13.5C13.7761 16.5 14 16.2761 14 16C14 15.7239 13.7761 15.5 13.5 15.5H6.5Z'
				fill={color}
				className={className}
			/>
			<path
				d='M18.0012 7L18 20.5H19C20.1046 20.5 21 19.6046 21 18.5V9C21 7.89543 20.1046 7 19 7H18.0012Z'
				fill={color}
				className={className}
			/>
		</svg>
	);
};

export default FeedFilled;
