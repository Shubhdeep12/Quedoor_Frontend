'use client'

import { type PropsWithChildren } from 'react'
import AuthProvider from './AuthProvider';
import ToastProvider from './ToastProvider';
import "react-toastify/dist/ReactToastify.css"; //add this line

const Providers = (props: PropsWithChildren) => {
	return (
		<AuthProvider>
			<ToastProvider>
				{props.children}
			</ToastProvider>
		</AuthProvider>
	)
}

export default Providers;
