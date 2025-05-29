import type { Post } from "../types/Post";
import Reactions from "./Reactions";
import "../styles/PostCard.scss";

interface PostCardProps {
  post: Post;
  index: number;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
}

const PostCard = ({ post, index, onLike, onDislike }: PostCardProps) => {
  return (
    <div
      className={`card-grid__item ${
        index === 0 ? "card-grid__item--full" : ""
      }`}
    >
      <img src={post.image} alt={post.title} className="card__image" />
      <div className="card__content">
        <div className="card__top-wrapper">
          <h2 className="card__title">{post.title}</h2>
          {index === 0 && (
            <Reactions post={post} onLike={onLike} onDislike={onDislike} />
          )}
        </div>
        {index === 0 && <p className="card__description">{post.body}</p>}
      </div>

      {index !== 0 && (
        <Reactions post={post} onLike={onLike} onDislike={onDislike} />
      )}
      <a href={`/${post.id}`} className="card__link">
        Читать далее
      </a>
    </div>
  );
};

export default PostCard;
