import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import SingleBlogPage from "../pages/SingleBlogPage";

const AppRouter = () => (
  <Router
    basename={import.meta.env.MODE === "development" ? "/" : "/blog-test-case"}
  >
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/:id" element={<SingleBlogPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
