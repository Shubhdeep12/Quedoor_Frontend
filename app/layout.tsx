import './globals.css'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import Providers from '@/providers'

const manrope = Manrope({
	subsets: ['latin'],
	variable: '--font-manrope',
})

export const metadata: Metadata = {
	title: 'Quedoor',
	description: 'A social media app for Students to clear doubts.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${manrope.variable} font-sans min-h-screen`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
