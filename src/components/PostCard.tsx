import type { Post } from "../types/Post";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Reactions from "./Reactions";
import "../styles/PostCard.scss";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
  index: number;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
}

const PostCard = ({ post, index, onLike, onDislike }: PostCardProps) => {
  const reaction = useSelector((state: RootState) => state.reactions[post.id]);

  return (
    <div
      className={`card-grid__item ${
        index === 0 ? "card-grid__item--full" : ""
      }`}
    >
      <img
        src={post.image}
        alt={post.title}
        className={`card__image ${index === 0 ? "card__image--full" : ""}`}
      />
      <div
        className={`card__content ${index === 0 ? "card__content--full" : ""}`}
      >
        <div className="card__top-wrapper">
          <h2 className="card__title">{post.title}</h2>
          {index === 0 && reaction && (
            <Reactions
              postId={post.id}
              liked={reaction.liked || false}
              disliked={reaction.disliked || false}
              reactions={reaction.reactions}
              onLike={onLike}
              onDislike={onDislike}
            />
          )}
        </div>
        {index === 0 && <p className="card__description">{post.body}</p>}
        <div
          className={`card__bottom ${index === 0 ? "card__bottom--full" : ""}`}
        >
          {index !== 0 && reaction && (
            <Reactions
              postId={post.id}
              liked={reaction.liked}
              disliked={reaction.disliked}
              reactions={reaction.reactions}
              onLike={onLike}
              onDislike={onDislike}
            />
          )}
          <Link to={`/${post.id}`} className="card__link">
            Читать далее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
