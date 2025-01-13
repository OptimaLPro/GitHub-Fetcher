import CardRepo from "@/components/CardRepo/CardRepo";
import PageTransition from "@/components/PageTransition/PageTransition";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import useRepositories from "@/hooks/useRepositories";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function RepositoryList() {
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : {};
  });

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [stars, setStars] = useState<number | undefined>(undefined);

  const { data, isLoading, isError } = useRepositories(page, 9, stars, query);

  useEffect(() => {
    if (data) {
      setFetchedData(data);
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading repositories.</p>;

  const mostStarred = data[0]?.stargazers_count || 0;

  const handleSearch = (newQuery: string, newStars: number) => {
    console.log("searching", newQuery, newStars);
    setQuery(newQuery);
    setStars(newStars);
    setPage(1); // Reset to the first page for new searches
  };

  return (
    <AnimatePresence mode="wait">
      <PageTransition>
        <div className="space-y-6">
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} maxStars={mostStarred} />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fetchedData?.map((repo: any) => (
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
