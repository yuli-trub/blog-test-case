import LikesIcon from "../assets/like-icon.svg";
import DislikesIcon from "../assets/dislike.svg";
import type { Post } from "../types/Post";

interface ReactionsProps {
  post: Post;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
}

const Reactions = ({ post, onLike, onDislike }: ReactionsProps) => {
  return (
    <>
      <div className="card__reactions">
        <div
          className={`card__reaction ${
            post.liked ? "card__reaction--like" : ""
          }`}
          onClick={() => onLike(post.id)}
        >
          <img src={LikesIcon} alt="like" className="card__rection-icon" />
          {post.reactions.like}
        </div>
        <div
          className={`card__reaction ${
            post.disliked ? "card__reaction--dislike" : ""
          }`}
          onClick={() => onDislike(post.id)}
        >
          <img
            src={DislikesIcon}
            alt="dislike"
            className="card__rection-icon"
          />
          {post.reactions.dislike}
        </div>
      </div>
    </>
  );
};

export default Reactions;
