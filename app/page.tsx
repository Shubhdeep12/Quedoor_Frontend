'use client';

import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	const { user } = useAuth();
	// if (user) {
	// 	router.push("/feed");
	// }
	// router.push("/login")
}
