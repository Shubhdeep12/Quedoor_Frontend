'use client';

import { type PropsWithChildren } from 'react';
import AuthProvider from './AuthProvider';
import ChakraUIProvider from './ChakraUIProvider';

const Providers = (props: PropsWithChildren) => {
	return (
		<AuthProvider>
			<ChakraUIProvider>{props.children}</ChakraUIProvider>
		</AuthProvider>
	);
};

export default Providers;
