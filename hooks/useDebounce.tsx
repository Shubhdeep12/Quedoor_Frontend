import { useState, useEffect, useCallback } from 'react';

const useDebounce = (callback: any, delay: number) => {
	const [debouncedCallback, setDebouncedCallback] = useState(null);

	const debounce = useCallback(
		(...args: any[]) => {
			if (debouncedCallback) {
				clearTimeout(debouncedCallback);
			}

			const timer: any = setTimeout(() => {
				callback(...args);
			}, delay);

			setDebouncedCallback(timer);
		},
		[callback, delay, debouncedCallback]
	);

	useEffect(() => {
		return () => {
			if (debouncedCallback) {
				clearTimeout(debouncedCallback);
			}
		};
	}, [debouncedCallback]);

	return debounce;
};

export default useDebounce;
