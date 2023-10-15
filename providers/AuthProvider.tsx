/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { ReactNode, createContext, useState, useEffect, FC } from 'react';

import { getCookie, getItem } from '@/utils/misc';
import PageLoader from '@/components/PageLoader';
import { useRouter } from 'next/navigation';
import { getMe } from '@/queries/auth';

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
};

export const AuthContext = createContext<AuthContext>({
	user: null,
	reset: () => {},
	updateUser: () => {},
});

const AuthProvider: FC<AuthContextProps> = ({ children }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<IUser | null>(null);

	const reset = () => {
		setUser(null); // set user
	};

	const updateUser = (user: IUser) => setUser(user);

	const setupSession = async () => {
		setLoading(true);
		const localToken = getItem('quedoor-token');
		const cookieToken = getCookie('quedoor-token');

		if (cookieToken) {
			const res = await getMe(localToken || cookieToken);
			setUser(res.data.data);
		} else {
			setLoading(false);
			router.push('/login');
		}
		setLoading(false);
	};

	useEffect(() => {
		setupSession();
	}, []);

	if (loading) {
		return <PageLoader />;
	}

	return <AuthContext.Provider value={{ user, reset, updateUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
