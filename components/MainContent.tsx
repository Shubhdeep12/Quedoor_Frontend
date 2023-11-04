'use client';
import MobileComingSoon from './MobileComingSoon';
import { Toaster } from '@/ui/toaster';
import Sidebar from './Sidebar';

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
			<div className='hidden laptop:block'>
				<div className='flex gap-12 h-[100vh]'>
					<Sidebar />
					<main id='feedscrollable' className='w-full overflow-y-auto'>
						{children}
					</main>
				</div>
			</div>
			<MobileComingSoon />
			<Toaster />
		</main>
	);
}
