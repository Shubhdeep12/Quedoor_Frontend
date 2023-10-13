'use client';

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	const { user } = useAuth();
	if (user && user.id) {
		router.push('/feed');
	}
	router.push('/login');
}
