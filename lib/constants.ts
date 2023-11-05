export type UserProps = {
  id: string;
  name: string;
  email: string;
  profile_img?: string;
  city?: string;
  website?: string;
};

export type PostProps = {
  _id: string,
  description?: string,
  rich_description?: string,
  image_url?: string,
  image_text?: string,
  creator: UserProps,
  userId: string,
  updated_at: string
}

export type CommentProps = {
  _id: string,
  postId: string,
  description?: string,
  rich_description?: string,
  image_url?: string,
  image_text?: string,
  creator: UserProps,
  userId: string,
  updated_at: string
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