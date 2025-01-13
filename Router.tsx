import Home from "@/pages/Home/Home";
import { Routes, Route } from "react-router";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Router;
