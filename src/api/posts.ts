import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async () => {
  const { data } = await axios.get(`${API_URL}/posts`);
  return data.slice(0, 10).map((post: any) => ({
    ...post,
    image: `https://placehold.co/600x400?text=Post+${post.id}`,
    reactions: {
      like: Math.floor(Math.random() * 51),
      dislike: Math.floor(Math.random() * 51),
    },
    liked: false,
    disliked: false,
  }));
};

export const fetchPostById = async (id: number) => {
  const { data } = await axios.get(`${API_URL}/posts/${id}`);
  return {
    ...data,
    image: `https://placehold.co/600x400?text=Post+${data.id}`,
    reactions: {
      like: Math.floor(Math.random() * 51),
      dislike: Math.floor(Math.random() * 51),
    },
    liked: false,
    disliked: false,
  };
};
