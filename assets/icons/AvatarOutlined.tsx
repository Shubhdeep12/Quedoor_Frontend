import { FC } from 'react';
import { IconProps } from '.';

const AvatarOutlined: FC<IconProps> = ({
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
			className={className}
			{...props}
		>
			<path
				d='M16.8008 16.8008C16.8008 15.5278 16.2951 14.3069 15.3949 13.4067C14.4947 12.5065 13.2738 12.0008 12.0008 12.0008M12.0008 12.0008C10.7278 12.0008 9.50687 12.5065 8.60669 13.4067C7.70652 14.3069 7.20081 15.5278 7.20081 16.8008M12.0008 12.0008C13.3263 12.0008 14.4008 10.9263 14.4008 9.60081C14.4008 8.27532 13.3263 7.20081 12.0008 7.20081C10.6753 7.20081 9.60081 8.27532 9.60081 9.60081C9.60081 10.9263 10.6753 12.0008 12.0008 12.0008ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
				stroke={color}
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
				className={className}
			/>
		</svg>
	);
};

export default AvatarOutlined;
