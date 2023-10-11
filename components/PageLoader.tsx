'use client';

import { Spinner } from '@chakra-ui/react';

const PageLoader = () => {
	return (
		<div className='w-full h-full absolute translate-x-1/2 translate-y-1/2'>
			<Spinner size='lg' className='w-10 h-10' />
		</div>
	);
};

export default PageLoader;
