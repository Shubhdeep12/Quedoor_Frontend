import QuedoorLogoIcon from '@/assets/icons/QuedoorLogoIcon';
import { LuSearch } from 'react-icons/lu';

export default function Navbar() {
	return (
		<div className='w-full py-0.5 shadow-sm bg-white'>
			<div className='flex px-8 gap-8 h-[60px] items-center max-w-laptop mx-auto'>
				<QuedoorLogoIcon size={60} />
				<div className='flex justify-between items-center hover:bg-slate-50 cursor-pointer transition-all flex-1 text-sm text-neutral-500 border border-neutral-200 rounded-full py-3 px-5'>
					Search post using image, text, etc.
					<LuSearch size={16} />
				</div>
			</div>
		</div>
	);
}
