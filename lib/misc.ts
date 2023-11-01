import { formatDistanceToNow } from 'date-fns'

export const setItem = (key :string, data: string) => localStorage.setItem(key, data);

export const getItem = (key='') => localStorage.getItem(key);

export const clearItem = (key='') => localStorage.removeItem(key);

const isProdEnv = () => process.env.NEXT_PUBLIC_NODE_ENV === 'production'

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const setCookie = (key: string , value: string, minutes = 365 * 24 * 60) => {
  try {
    let expires = '';
    const date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${key}=${value || ''}${expires}; path=/; domain=${DOMAIN}; ${isProdEnv() && 'SameSite=None; Secure'}`;
    
    console.log('Cookie set successfully:');
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
};


export const getCookie = (key: string) => {
  const cookieArr = document.cookie.split(';');

  for (let i = 0; i < cookieArr.length; i++) {
    const data = cookieArr[i].split('=');
    if (key === data[0].trim()) {
      return data[1];
    }
  }

  // Return null if not found
  return null;
};

export const removeCookie = (key: string) => {
  const expires = '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = `${key}=''${expires}; path=/; domain=${DOMAIN}; ${isProdEnv() && 'SameSite=None; Secure'}`;
};


export const getRelativeTime = (timestamp: string) => {
  const formattedTime = formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  
  return formattedTime
}

export const file2Base64 = (file: File): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result?.toString() || '');
		reader.onerror = (error) => reject(error);
	});
};