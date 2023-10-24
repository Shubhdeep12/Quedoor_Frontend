'use client';
import MobileComingSoon from './MobileComingSoon';
import Navbar from './Navbar';
import { Toaster } from '@/ui/toaster';

type MainProps = {
	children?: React.ReactNode;
};
export default function MainContent({ children }: MainProps) {
	return (
		<main
			className='
      animate-page-transition
      [animation-delay:150ms]
      w-full
			h-screen
			bg-background
			'
		>
			<Navbar />
			<div className='hidden laptop:block'>{children}</div>
			<MobileComingSoon />
			<Toaster />
		</main>
	);
}
