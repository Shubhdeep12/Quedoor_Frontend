'use client';

import { type PropsWithChildren } from 'react';
import AuthProvider from './AuthProvider';
import ReactQueryProvider from './ReactQueryProvider';
import { ThemeProvider } from './ThemeProvider';

const Providers = (props: PropsWithChildren) => {
	return (
		<AuthProvider>
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
				<ReactQueryProvider>{props.children}</ReactQueryProvider>
			</ThemeProvider>
		</AuthProvider>
	);
};

export default Providers;
