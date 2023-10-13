'use client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { FC, ReactNode, useState } from 'react';

type ReactQueryProviderProps = {
	children: ReactNode;
};

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {
	const [queryClient] = useState(new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }));

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
