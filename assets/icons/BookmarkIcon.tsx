<svg width='87' height='106' viewBox='0 0 87 106' fill='none' xmlns='http://www.w3.org/2000/svg'></svg>;

import { FC } from 'react';
import { IconProps } from '.';

const BookmarkIcon: FC<IconProps> = ({ height = 16, width = 16, size = 16, color = '##000', ...props }) => {
	return (
		<svg
			width={size || width}
			height={size || height}
			viewBox='0 0 87 106'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M83.1953 102.439L83.1946 102.438L49.8086 77.2491C49.8085 77.249 49.8085 77.249 49.8085 77.249C46.1659 74.5006 40.8352 74.5014 37.1922 77.2485L37.1915 77.249L3.80557 102.438C3.80553 102.438 3.80549 102.438 3.80545 102.438C3.7746 102.461 3.72565 102.487 3.63849 102.497C3.5936 102.501 3.54639 102.501 3.5 102.496V5.86887C3.5 5.07779 4.46862 3.5 6.91708 3.5H80.0829C82.5314 3.5 83.5 5.0778 83.5 5.86887V102.496C83.4534 102.501 83.406 102.501 83.361 102.497C83.2738 102.487 83.2254 102.461 83.1953 102.439ZM3.2798 102.428C3.27981 102.428 3.28038 102.428 3.28149 102.429C3.28034 102.428 3.27979 102.428 3.2798 102.428Z'
				fill={props.filled ? color : 'white'}
				stroke={color}
				stroke-width='7'
			/>
		</svg>
	);
};

export default BookmarkIcon;
