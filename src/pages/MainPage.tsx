import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/posts/postsSlice";
import type { RootState, AppDispatch } from "../store";
import {
  initializeReactions,
  toggleReaction,
} from "../features/reactions/reactionsSlice";

import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";

import "../styles/mainPage.scss";

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, error } = useSelector(
    (state: RootState) => state.posts
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    dispatch(fetchPosts(searchTerm.trim()));
  };
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      posts.forEach((post) => {
        dispatch(initializeReactions({ postId: post.id }));
      });
    }
  }, [dispatch, posts, status]);

  const handleLikes = (id: number) => {
    dispatch(toggleReaction({ postId: id, type: "like" }));
  };

  const handleDislikes = (id: number) => {
    dispatch(toggleReaction({ postId: id, type: "dislike" }));
  };

  return (
    <main className="blogs">
      <h1 className="blogs__title">Блог</h1>
      <p className="blogs__information">
        Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а
        также переводим зарубежные статьи
      </p>

      <section className="blogs__list">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
        />

        {status === "loading" && (
          <div className="blogs__loading">
            <div className="spinner"></div>
            Загрузка...
          </div>
        )}
        {status === "failed" && (
          <div className="blogs__error">Ошибка: {error}</div>
        )}

        {status === "succeeded" && (
          <div className="card-grid">
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                index={index}
                onLike={handleLikes}
                onDislike={handleDislikes}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MainPage;
