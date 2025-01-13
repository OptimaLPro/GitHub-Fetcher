import CardRepo from "@/components/CardRepo/CardRepo";
import PageTransition from "@/components/PageTransition/PageTransition";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import useRepositories from "@/hooks/useRepositories";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function RepositoryList() {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useRepositories(page, 9);

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading repositories.</p>;

  return (
    <AnimatePresence mode="wait">
      <PageTransition>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((repo: any) => (
              <CardRepo
                key={repo.id}
                repo={repo}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-2">
              {page > 1 && (
                <Button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                  Previous
                </Button>
              )}
            </div>
            <span>Page {page}</span>
            <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </div>
      </PageTransition>
    </AnimatePresence>
  );
}
