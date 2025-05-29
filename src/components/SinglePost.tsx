// import BackArrow from "../assets/arrow-left.svg";
// import Reactions from "./Reactions";
// import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchPostById,
//   toggleLike,
//   toggleDislike,
// } from "../features/posts/postsSlice";

// import type { RootState, AppDispatch } from "../store";

// const SinglePost = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch<AppDispatch>();
//   const { selectedPost, status, error } = useSelector(
//     (state: RootState) => state.posts
//   );

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchPostById(+id));
//     }
//   }, [dispatch, id]);

//   const handleLike = (postId: number) => {
//     dispatch(toggleLike(postId));
//   };

//   const handleDislike = (postId: number) => {
//     dispatch(toggleDislike(postId));
//   };

//   if (status === "loading") return <p>Загрузка...</p>;
//   if (error || !selectedPost)
//     return <p>Ошибка: не удалось загрузить статью.</p>;

//   return (
//     <>
//       <header className="header">
//         <div className="header__back">
//           <img src={BackArrow} alt="back arrow" className="header__back-icon" />
//           <p className="header__back-text">Вернуться к статьям</p>
//         </div>
//         <Reactions
//           post={selectedPost}
//           onLike={handleLike}
//           onDislike={handleDislike}
//         />
//       </header>
//     </>
//   );
// };

// export default SinglePost;
