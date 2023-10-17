/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, FC } from 'react';
import { getCookie, getItem } from '@/utils/misc';
import PageLoader from '@/components/PageLoader';
import { useRouter } from 'next/navigation';
import { getMe } from '@/queries/auth';
import { useAuthStore } from '@/store/zustand';

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const router = useRouter();
	const { loading, reset, updateUser } = useAuthStore();

	const setupSession = async () => {
		try {
			const localToken = getItem('quedoor-token');
			const cookieToken = getCookie('quedoor-token');

			if (cookieToken) {
				// Start loading
				useAuthStore.setState({ loading: true });

				const res = await getMe(localToken || cookieToken);
				updateUser(res.data.data);
			} else {
				reset();
				router.push('/login');
			}
		} finally {
			// Stop loading
			useAuthStore.setState({ loading: false });
		}
	};

	useEffect(() => {
		setupSession();
	}, []);

	if (loading) {
		return <PageLoader />;
	}

	return <>{children}</>;
};

export default AuthProvider;
