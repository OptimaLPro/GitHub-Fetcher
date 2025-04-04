import { fetchFavorites } from "@/api/favorites";
import CardRepo from "@/components/CardRepo/CardRepo";
import PageTransition from "@/components/PageTransition/PageTransition";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Button } from "@/components/ui/button";
import ErrorLimit from "@/components/ui/ErrorLimit";
import Loader from "@/components/ui/Loader";
import useRepositories from "@/hooks/useRepositories";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function RepositoryList() {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>("");
  const [stars, setStars] = useState<number>(0);
  const [order, setOrder] = useState<string>("desc");

  const { data, isLoading, isError, refetch } = useRepositories(
    page,
    9,
    stars,
    query,
    order
  );

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteRepos = await fetchFavorites();
        const favoriteMap = favoriteRepos.reduce(
          (acc: { [key: string]: boolean }, repo: { id: string }) => {
            acc[repo.id] = true;
            return acc;
          },
          {}
        );
        setFavorites(favoriteMap);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorLimit refetch={refetch} />;

  const { sortedData, totalCount } = data;
  const mostStarred = sortedData[0]?.stargazers_count + 1 || 0;

  const handleSearch = (
    newQuery: string,
    newStars: number,
    newOrder: string
  ) => {
    setQuery(newQuery);
    setStars(newStars);
    setPage(1);
    setOrder(newOrder);
  };

  return (
    <AnimatePresence mode="wait">
      <PageTransition>
        <div className="space-y-6">
          <div className="mb-8">
            <SearchBar
              onSearch={handleSearch}
              maxStars={mostStarred}
              query={query}
              stars={stars}
              order={order}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedData?.map((repo: any) => (
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
            <span className="text-gray-500">
              {totalCount.toLocaleString()} Results,
              <span className="font-semibold"> Page {page}</span>
            </span>
            <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </div>
      </PageTransition>
    </AnimatePresence>
  );
}
