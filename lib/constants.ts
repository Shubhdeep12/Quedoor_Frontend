export type UserProps = {
  id: number;
  name: string;
  email: string;
  profileImg?: string;
  city?: string;
  website?: string;
  followers?: number[];
  following?: number[];
};

export type PostProps = {
  id: number,
  description?: string,
  richDescription?: string,
  imageUrl?: string,
  imageText?: string,
  creator: UserProps,
  userId: number,
  updatedAt: string
}

export type CommentProps = {
  id: number,
  postId: number,
  description?: string,
  richDescription?: string,
  imageUrl?: string,
  imageText?: string,
  creator: UserProps,
  userId: number,
  updatedAt: string
}


export const bgColors = [
  'bg-[#deebfe]',
  'bg-[#fff6e0]',
  'bg-[#ffede0]',
  'bg-[#ffe0e0]',
  'bg-[#eaffe0]',
  'bg-[#e0fff7]',
  'bg-[#ffe0e4]',
  'bg-[#e0e1ff]',
  'bg-[#f7ffe0]',

]