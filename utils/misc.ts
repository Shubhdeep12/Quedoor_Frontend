export const setStoredToken = (token: string) => localStorage.setItem('quedoor-token', token);

export const getStoredToken = () => localStorage.getItem('quedoor-token');

export const clearToken = () => localStorage.removeItem('quedoor-token');

export const setStoredUser = (userData: string) => localStorage.setItem('quedoor-user', userData);

export const getUserData = () => localStorage.getItem('quedoor-user');

export const clearUserData = () => localStorage.removeItem('quedoor-user');