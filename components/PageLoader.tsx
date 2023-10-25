'use client';

import { BiLoaderAlt } from 'react-icons/bi';

const PageLoader = () => {
	return (
		<div className='h-screen w-screen'>
			<div className='flex items-center justify-center h-full'>
				<BiLoaderAlt className='h-10 w-10 animate-spin' />
			</div>
		</div>
	);
};

export default PageLoader;
