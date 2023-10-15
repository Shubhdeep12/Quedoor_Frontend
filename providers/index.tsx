'use client';

import { type PropsWithChildren } from 'react';
import AuthProvider from './AuthProvider';
import ChakraUIProvider from './ChakraUIProvider';
import ReactQueryProvider from './ReactQueryProvider';

const Providers = (props: PropsWithChildren) => {
	return (
		<AuthProvider>
			<ChakraUIProvider>
				<ReactQueryProvider>{props.children}</ReactQueryProvider>
			</ChakraUIProvider>
		</AuthProvider>
	);
};

export default Providers;
