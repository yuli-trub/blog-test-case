import BackArrow from "../assets/arrow-left.svg";
import Reactions from "../components/Reactions";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostById } from "../features/posts/postsSlice";
import {
  initializeReactions,
  toggleReaction,
} from "../features/reactions/reactionsSlice";
import type { RootState, AppDispatch } from "../store";
import "../styles/singlePost.scss";

const SinglePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPost, status, error } = useSelector(
    (state: RootState) => state.posts
  );

  const reaction = useSelector((state: RootState) =>
    selectedPost ? state.reactions[selectedPost.id] : undefined
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(+id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (status === "succeeded") {
      if (selectedPost) {
        dispatch(initializeReactions({ postId: selectedPost.id }));
      }
    }
  }, [dispatch, id, status]);

  const handleLikes = (id: number) => {
    dispatch(toggleReaction({ postId: id, type: "like" }));
  };

  const handleDislikes = (id: number) => {
    dispatch(toggleReaction({ postId: id, type: "dislike" }));
  };

  if (status === "loading")
    return (
      <div className="blogs__loading">
        <div className="spinner"></div>
        Загрузка...
      </div>
    );
  if (error || !selectedPost)
    return <div className="blogs__error">Ошибка: {error}</div>;

  return (
    <>
      <header className="header">
        <Link to="/" className="header__back">
          <img src={BackArrow} alt="back arrow" className="header__back-icon" />
          <p className="header__back-text">Вернуться к статьям</p>
        </Link>
        {reaction && (
          <Reactions
            postId={selectedPost.id}
            liked={reaction?.liked || false}
            disliked={reaction?.disliked || false}
            reactions={reaction?.reactions}
            onLike={handleLikes}
            onDislike={handleDislikes}
          />
        )}
      </header>
      <article className="post">
        <h1 className="post__title">{selectedPost.title}</h1>
        <div className="post__content">
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="post__image"
          />
          <p className="post__body">{selectedPost.body}</p>
        </div>
      </article>
    </>
  );
};

export default SinglePost;
