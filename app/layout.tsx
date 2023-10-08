import './globals.css'
import { Manrope } from 'next/font/google'
import Providers from '@/providers'

const manrope = Manrope({
	subsets: ['latin'],
	variable: '--font-manrope',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${manrope.variable} font-sans min-h-screen`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
