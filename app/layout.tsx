import './globals.css';
import { Manrope } from 'next/font/google';
import Providers from '@/providers';
import MainContent from '@/components/MainContent';
import { Metadata } from 'next';

const manrope = Manrope({
	subsets: ['latin'],
	variable: '--font-manrope',
});

export const metadata: Metadata = {
	title: 'Quedoor',
	description: 'Quedoor',
	applicationName: 'Shubhdeep Chhabra Portfolio',
	authors: [{ name: 'Shubhdeep Chhabra Portfolio', url: 'https://www.shubhdeepchhabra.in' }],
	referrer: 'origin',
	creator: 'Shubhdeep Chhabra',
	publisher: 'Shubhdeep Chhabra',
	// openGraph: {
	// 	type: 'website',
	// 	description: 'Quedoor',
	// 	title: 'Quedoor',
	// 	locale: 'en_US',
	// 	siteName: 'Quedoor',
	// 	url: 'https://www.shubhdeepchhabra.in/',
	// 	images: [
	// 		{
	// 			url: '/assets/Shubhdeepchhabra.png',
	// 			alt: 'Shubhdeep Chhabra - Software Engineer | Tech Enthusiast',
	// 			width: '1200',
	// 			height: '630',
	// 		},
	// 	],
	// },
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${manrope.variable} font-sans min-h-screen`}>
				<Providers>
					<MainContent>{children}</MainContent>
				</Providers>
			</body>
		</html>
	);
}
