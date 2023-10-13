export const setItem = (key = '', data: string) => localStorage.setItem(key, data);

export const getItem = (key='') => localStorage.getItem(key);

export const clearToken = () => localStorage.removeItem('quedoor-token');

export const setCookie = (key = '', data: string) => localStorage.setItem(key, data);

export const getCookie = (key='') => localStorage.getItem(key);

export const clearUserData = () => localStorage.removeItem('quedoor-user');