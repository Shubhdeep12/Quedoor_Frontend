'use client';

// import { Spinner } from '@chakra-ui/react';

const PageLoader = () => {
	return (
		<div className='h-screen w-screen'>
			<div className='flex items-center justify-center h-full'>{/* <Spinner size='lg' className='w-10 h-10' /> */}</div>
		</div>
	);
};

export default PageLoader;
