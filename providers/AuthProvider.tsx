/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { ReactNode, createContext, useState, useEffect, FC } from 'react';

import { getCookie, getItem } from '@/utils/misc';
// import { useRouter } from 'next/navigation';
import PageLoader from '@/components/PageLoader';
import { redirect } from 'next/navigation';

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
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<IUser | null>(null);

	const reset = () => {
		setUser(null); // set user
	};

	const updateUser = (user: IUser) => setUser(user);

	const setupSession = () => {
		const localToken = getItem('quedoor-token');
		const localUserData = getItem('quedoor-user');
		const cookieToken = getCookie('quedoor-token');
		const cookieUserData = getCookie('quedoor-user');
		if (localToken && localUserData) {
			setUser(JSON.parse(localUserData));
		} else if (cookieToken && cookieUserData) {
			setUser(JSON.parse(cookieUserData));
		} else {
			setLoading(false);
			redirect('/login');
		}
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
