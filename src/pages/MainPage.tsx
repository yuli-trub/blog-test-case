import ArrowIcon from "../assets/arrow-left.svg";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  toggleLike,
  toggleDislike,
} from "../features/posts/postsSlice";
import type { RootState, AppDispatch } from "../store";
import LikesIcon from "../assets/like-icon.svg";
import DislikesIcon from "../assets/dislike.svg";

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleLikes = (id: number) => {
    dispatch(toggleLike(id));
  };

  const handleDislikes = (id: number) => {
    dispatch(toggleDislike(id));
  };

  return (
    <main className="blogs">
      <h1 className="blogs__title">Блог</h1>
      <p className="blogs__information">
        Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а
        также переводим зарубежные статьи
      </p>

      <section className="blogs__list">
        <div className="search-bar">
          <img src={ArrowIcon} className="search-bar__icon" alt="Arrob back" />
          <input
            type="text"
            placeholder="Поиск по названию статьи"
            className="search-bar__input"
          />
        </div>

        <div className="card-grid">
          {posts.slice(0, 10).map((post, index) => (
            <div
              key={index}
              className={`card-grid__item ${
                index === 0 ? "card-grid__item--full" : ""
              }`}
            >
              <div className="card__content">
                <div className="card__top-wrapper">
                  <h2 className="card__title">{post.title}</h2>
                  <div className="card__reactions">
                    <div
                      className={`card__reaction ${
                        post.liked ? "card__reaction--like" : ""
                      }`}
                      onClick={() => handleLikes(post.id)}
                    >
                      <img
                        src={LikesIcon}
                        alt="like"
                        className="card__rection-icon"
                      />
                      {post.reactions.like}
                    </div>
                    <div
                      className={`card__reaction ${
                        post.disliked ? "card__reaction--dislike" : ""
                      }`}
                      onClick={() => handleDislikes(post.id)}
                    >
                      <img
                        src={DislikesIcon}
                        alt="like"
                        className="card__rection-icon"
                      />
                      {post.reactions.dislike}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainPage;
