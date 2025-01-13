import CardRepo from "@/components/CardRepo/CardRepo";
import PageTransition from "@/components/PageTransition/PageTransition";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState<{ [key: string]: any }>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });

  if (Object.keys(favorites).length === 0) {
    return <p className="text-center mt-[100px]">No favorite repositories yet.</p>;
  }

  const favoriteRepos = Object.values(favorites);

  return (
    <AnimatePresence mode="wait">
      <PageTransition>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteRepos.map((repo: any) => (
              <CardRepo
                key={repo.id}
                repo={repo}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ))}
          </div>
        </div>
      </PageTransition>
    </AnimatePresence>
  );
}
