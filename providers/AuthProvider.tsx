/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { ReactNode, createContext, useState, useEffect, FC } from 'react';

import { getItem } from '@/utils/misc';
// import { useRouter } from 'next/navigation';
import PageLoader from '@/components/PageLoader';
import { useRouter } from 'next/navigation';

type AuthContextProps = {
	children: ReactNode;
};

export type IUser = {
	id: string;
	name: string;
	email: string;
	profileImg?: string;
	city?: string;
	website?: string;
};

type AuthContext = {
	user: IUser | null;
	reset: () => void;
	updateUser: (user: IUser) => void;
	loading: boolean;
};

export const AuthContext = createContext<AuthContext>({
	user: null,
	reset: () => {},
	updateUser: () => {},
	loading: true,
});

const AuthProvider: FC<AuthContextProps> = ({ children }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<IUser | null>(null);

	const reset = () => {
		setUser(null); // set user
	};

	const updateUser = (user: IUser) => setUser(user);

	const setupSession = () => {
		const localToken = getItem('quedoor-token');
		const userData = getItem('quedoor-user');
		if (localToken && userData) {
			setUser(JSON.parse(userData));
		} else router.push('/login');
		// setUser({
		// 	name: 'Shubhdeep Chhabra',
		// 	email: 'chhabrashubhdeep@gmail.com',
		// 	id: '11',
		// 	profileImg: 'https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg',
		// });
	};

	useEffect(() => {
		setLoading(true);
		setupSession();
		setLoading(false);
	}, []);

	if (loading) {
		return (
			<div className='h-screen w-screen'>
				<PageLoader />
			</div>
		);
	}

	return <AuthContext.Provider value={{ user, reset, updateUser, loading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
