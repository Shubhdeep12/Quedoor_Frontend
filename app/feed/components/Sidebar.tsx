'use client'

import Text from "@/components/Text";
import useAuth from "@/hooks/useAuth";
import { Avatar, Button } from "@chakra-ui/react";
import clsx from "clsx";
import { useState } from "react";
import { BiSolidCommentDetail } from "react-icons/bi";
import { BsFilePost } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { TbSquareChevronUp } from "react-icons/tb";



const Sidebar = () => {

	const { user } = useAuth();
	const [recentActivityCollapsed, setRecentActivityCollapsed] = useState<boolean>(false);
	const [recentFollowersCollapsed, setRecentFollowersCollapsed] = useState<boolean>(false);
  return (
    <div
				className='left-section
					p-6
					border-r
					w-1/5 min-w-max  h-[calc(100vh-64px)]
					fixed
					bg-slate-500 bg-opacity-5
					flex flex-col gap-10'
			>
				<div className='flex justify-between w-full items-center'>
					<div className='flex items-center gap-2'>
						<Avatar size='sm' name={user?.name} src={user?.profileImg} />
						<Text className='text-sm font-bold'>Shubhdeep Chhabra</Text>
					</div>

					<Button className='bg-primary-light bg-opacity-70 transition hover:bg-opacity-75' colorScheme="bg-primary-light" size='sm' variant='solid'>
						<IoCreateOutline size={16} />
						&nbsp;&nbsp;Create
					</Button>
				</div>

				<div className='flex flex-col items-start gap-4'>
        <div
          className='w-full flex items-center justify-between cursor-pointer transition-all p-2 rounded-md bg-primary-light bg-opacity-20 hover:bg-opacity-40'
          onClick={() => setRecentActivityCollapsed((prev) => !prev)}
        >
						<Text className='text-sm font-bold'>Recent Activity</Text>
						<TbSquareChevronUp
							className={clsx({
								'transition-all': true,
								'rotate-180': recentActivityCollapsed,
								'cursor-pointer': true,
							})}
							size={18}
						/>
					</div>
					<div
						className={clsx({
							'w-full flex flex-col items-start gap-2 overflow-hidden transition-height duration-200 ease-in-out': true,
							'h-52': !recentActivityCollapsed,
							'h-0': recentActivityCollapsed,
						})}
					>
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BsFilePost size={14} />
							Title of post created by you...
						</Text>
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BsFilePost size={14} />
							Title of post created by you...
						</Text>
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BiSolidCommentDetail size={14} />
							Title of comment created by you...
						</Text>
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BsFilePost size={14} />
							Title of post created by you...
						</Text>
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BiSolidCommentDetail size={14} />
							Title of comment created by you...
						</Text>
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BsFilePost size={14} />
							Title of post created by you...
						</Text>
						<Text className='text-sm flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<BsFilePost size={14} />
							Title of post created by you...
						</Text>
					</div>
				</div>

				<div className='flex flex-col items-start gap-4'>
        <div
          className='w-full flex items-center justify-between cursor-pointer transition-all p-2 rounded-md bg-primary-light bg-opacity-20 hover:bg-opacity-40'
          onClick={() => setRecentFollowersCollapsed((prev) => !prev)}
        >
						<Text className='text-sm font-bold'>Recent Followers</Text>
						<TbSquareChevronUp
							className={clsx({
								'transition-all': true,
								'rotate-180': recentFollowersCollapsed,
								'cursor-pointer': true,
							})}
							size={18}
						/>
					</div>
					<div
						className={clsx({
							'w-full flex flex-col items-start gap-2 overflow-hidden transition-height duration-200 ease-in-out': true,
							'h-80': !recentFollowersCollapsed,
							'h-0': recentFollowersCollapsed,
						})}
					>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<div className='flex items-center gap-2 cursor-pointer hover:underline underline-offset-2'>
							<Avatar size='xs' name={user?.name} src={user?.profileImg} />
							<Text className='text-sm'>Shubhdeep Chhabra</Text>
						</div>
						<Text className='text-sm text-gray-500 font-semibold hover:underline underline-offset-2 cursor-pointer transition'>
							Show All
						</Text>
					</div>
				</div>
			</div>
  )
}

export default Sidebar;