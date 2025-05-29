import LikesIcon from "../assets/like-icon.svg";
import DislikesIcon from "../assets/dislike.svg";
import RedDislikesIcon from "../assets/red-dislike.svg";
import GreenLikesIcon from "../assets/green-like.svg";

import type { Post } from "../types/Post";
import "../styles/reactions.scss";

interface ReactionsProps {
  post: Post;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
}

const Reactions = ({ post, onLike, onDislike }: ReactionsProps) => {
  return (
    <>
      <div className="reactions">
        <div className="reactions__reaction" onClick={() => onLike(post.id)}>
          <img
            src={post.liked ? GreenLikesIcon : LikesIcon}
            alt="like"
            className="reactions__icon"
          />
          {post.reactions.like}
        </div>
        <div className="reactions__reaction" onClick={() => onDislike(post.id)}>
          <img
            src={post.disliked ? RedDislikesIcon : DislikesIcon}
            alt="dislike"
            className="reactions__icon"
          />
          {post.reactions.dislike}
        </div>
      </div>
    </>
  );
};

export default Reactions;
