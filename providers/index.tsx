'use client'

import { type PropsWithChildren } from 'react'
import AuthProvider from './AuthProvider';
import ToastProvider from './ToastProvider';
import "react-toastify/dist/ReactToastify.css"; //add this line
import ChakraUIProvider from './ChakraUIProvider';

const Providers = (props: PropsWithChildren) => {
	return (
		<AuthProvider>
			<ToastProvider>
				<ChakraUIProvider>
					{props.children}
				</ChakraUIProvider>
			</ToastProvider>
		</AuthProvider>
	)
}

export default Providers;
