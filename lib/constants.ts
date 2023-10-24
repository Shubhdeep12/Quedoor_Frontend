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
  userId: string
}