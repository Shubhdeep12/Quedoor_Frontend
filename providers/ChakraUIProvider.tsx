'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';

interface ChakraUIProviderProps {
	children: React.ReactNode;
}

const ChakraUIProvider = ({ children }: ChakraUIProviderProps) => {
	return (
		<CacheProvider>
			<ChakraProvider>{children}</ChakraProvider>
		</CacheProvider>
	);
};

export default ChakraUIProvider;
