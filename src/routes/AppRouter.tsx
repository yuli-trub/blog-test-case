import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SingleBlogPage from "../pages/SingleBlogPage";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/blog/:id" element={<SingleBlogPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
