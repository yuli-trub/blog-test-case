import LikesIcon from "../assets/like-icon.svg";
import DislikesIcon from "../assets/dislike.svg";
import RedDislikesIcon from "../assets/red-dislike.svg";
import GreenLikesIcon from "../assets/green-like.svg";

import "../styles/reactions.scss";

interface ReactionsProps {
  postId: number;
  liked: boolean;
  disliked: boolean;
  reactions: {
    like: number;
    dislike: number;
  };
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
}

const Reactions = ({
  postId,
  liked,
  disliked,
  reactions,
  onLike,
  onDislike,
}: ReactionsProps) => {
  return (
    <>
      <div className="reactions">
        <div className="reactions__reaction" onClick={() => onLike(postId)}>
          <img
            src={liked ? GreenLikesIcon : LikesIcon}
            alt="like"
            className="reactions__icon"
          />
          {reactions.like}
        </div>
        <div className="reactions__reaction" onClick={() => onDislike(postId)}>
          <img
            src={disliked ? RedDislikesIcon : DislikesIcon}
            alt="dislike"
            className="reactions__icon"
          />
          {reactions.dislike}
        </div>
      </div>
    </>
  );
};

export default Reactions;
