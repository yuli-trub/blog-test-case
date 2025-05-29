export interface Post {
  id: number;
  title: string;
  body: string;
  image: string;
  reactions: {
    like: number;
    dislike: number;
  };
  liked: boolean;
  disliked: boolean;
}
