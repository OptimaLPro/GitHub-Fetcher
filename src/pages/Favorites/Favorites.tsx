import { fetchRepositoryByID } from "@/api/repositories";
import CardRepo from "@/components/CardRepo/CardRepo";
import PageTransition from "@/components/PageTransition/PageTransition";
import { isOlderThan } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [hasUpdatedFavorites, setHasUpdatedFavorites] = useState(false);
  const [favorites, setFavorites] = useState<{ [key: string]: any }>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });

  useEffect(() => {
    const updateOldFavorites = async () => {
      const updatedFavorites = { ...favorites };
      let hasChanges = false;

      for (const [key, repo] of Object.entries(favorites)) {
        // Check if the repository was added more than 24 hours ago
        if (isOlderThan(repo.added_localstorage, 24 * 60 * 60 * 1000)) {
          try {
            const updatedRepo = await fetchRepositoryByID(repo.id);
            updatedFavorites[key] = {
              ...updatedRepo,
              added_localstorage: new Date().toLocaleString(),
            };
            hasChanges = true;
          } catch (error) {
            console.error(`Failed to update repository ${repo.id}:`, error);
          }
        }
      }

      // Check if the favorites have been updated
      if (hasChanges) {
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setHasUpdatedFavorites(true);
      }
    };

    if (!hasUpdatedFavorites) {
      updateOldFavorites();
    }
  }, [favorites, hasUpdatedFavorites]);

  if (Object.keys(favorites).length === 0) {
    return (
      <p className="text-center mt-[100px]">No favorite repositories yet.</p>
    );
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
