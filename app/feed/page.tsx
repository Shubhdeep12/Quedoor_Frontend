import MainSection from './components/MainSection';
import Sidebar from './components/Sidebar';

export default function Feed() {
	return (
		<div className='flex gap-10 h-[calc(100vh-64px)] overflow-auto'>
			<Sidebar />
			<MainSection />
			<div className='right-section w-64 flex flex-col gap-6'>
				{/* <div className='recommend-user-widget max-h-72 h-auto w-full bg-white rounded-lg flex flex-col items-center gap-5 relative'>
					<div className='w-full flex items-center py-3 px-3 gap-2 rounded-t-lg bg-primary-light'>
						<HiMiniUsers size={18} />
						<Text className='text-base font-bold'>Recommended Users</Text>
					</div>
					<div className='w-full'>
						<div className='mx-3 mb-3 rounded-xl bg-gray-200 p-5 flex items-center justify-center'>
							<Text className='text-sm font-semibold text-gray-400'>Coming Soon...</Text>
						</div>
					</div>
				</div>

				<div className='recommend-user-widget max-h-72 h-auto w-full bg-white rounded-lg flex flex-col items-center gap-5 relative'>
					<div className='w-full flex items-center py-3 px-3 gap-2 rounded-t-lg bg-primary-light'>
						<ImPriceTags size={18} />
						<Text className='text-base font-bold'>Recommended Tags</Text>
					</div>
					<div className='w-full'>
						<div className='mx-3 mb-3 rounded-xl bg-gray-200 p-5 flex items-center justify-center'>
							<Text className='text-sm font-semibold text-gray-400'>Coming Soon...</Text>
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
}
