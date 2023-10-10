import MobileComingSoon from './MobileComingSoon';

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
      '
			// pt-[110px]
			// pb-10
			// overflow-x-hidden
			// px-2
		>
			<div className='hidden laptop:block'>{children}</div>
			<MobileComingSoon />
		</main>
	);
}
