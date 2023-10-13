'use client';

import { type PropsWithChildren } from 'react';
import AuthProvider from './AuthProvider';
import ChakraUIProvider from './ChakraUIProvider';
import ReactQueryProvider from './ReactQueryProvider';

const Providers = (props: PropsWithChildren) => {
	return (
		<AuthProvider>
			<ReactQueryProvider>
				<ChakraUIProvider>{props.children}</ChakraUIProvider>
			</ReactQueryProvider>
		</AuthProvider>
	);
};

export default Providers;
