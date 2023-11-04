'use client';
import MobileComingSoon from './MobileComingSoon';
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
			<div className='hidden laptop:block'>{children}</div>
			<MobileComingSoon />
			<Toaster />
		</main>
	);
}
