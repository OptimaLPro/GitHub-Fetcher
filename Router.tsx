import { AnimatePresence } from "framer-motion";
import { useLocation, Route, Routes } from "react-router";
import PageTransition from "@/components/PageTransition/PageTransition";
import Favorites from "@/pages/Favorites/Favorites";
import Home from "@/pages/Home/Home";
import Statistics from "@/pages/Statistics/Statistics";

const Router = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/favorites"
          element={
            <PageTransition>
              <Favorites />
            </PageTransition>
          }
        />
        <Route
          path="/statistics"
          element={
            <PageTransition>
              <Statistics />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
