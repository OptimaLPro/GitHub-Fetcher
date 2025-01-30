import { fetchFavorites } from "@/api/favorites";
import { fetchRepositoryByID } from "@/api/repositories";
import CardRepo from "@/components/CardRepo/CardRepo";
import PageTransition from "@/components/PageTransition/PageTransition";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import ErrorLimit from "@/components/ui/ErrorLimit";
import Loader from "@/components/ui/Loader";
import { isOlderThan } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [hasUpdatedFavorites, setHasUpdatedFavorites] = useState(false);
  const [favorites, setFavorites] = useState<{ [key: string]: any }>({});
  const [filteredFavorites, setFilteredFavorites] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [stars, setStars] = useState<number>(0);
  const [order, setOrder] = useState<string>("desc");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    refetchOnWindowFocus: false,
  });

  // Load favorites from server response
  useEffect(() => {
    if (data) {
      const transformed = data.reduce((acc: any, repo: any) => {
        acc[repo.id] = repo;
        return acc;
      }, {});
      setFavorites(transformed || {});
    }
  }, [data]);

  // Update stale repositories
  useEffect(() => {
    const updateOldFavorites = async () => {
      const updatedFavorites = { ...favorites };
      let hasChanges = false;

      for (const [key, repo] of Object.entries(favorites)) {
        if (isOlderThan(repo.added_favorites, 24 * 60 * 60 * 1000)) {
          try {
            const updatedRepo = await fetchRepositoryByID(repo.id);
            updatedFavorites[key] = {
              ...updatedRepo,
              added_favorites: new Date().toLocaleString(),
            };
            hasChanges = true;
          } catch (error) {
            console.error(`Failed to update repository ${repo.id}:`, error);
          }
        }
      }

      if (hasChanges) {
        setFavorites(updatedFavorites);
        setHasUpdatedFavorites(true);
      }
    };

    if (Object.keys(favorites).length > 0 && !hasUpdatedFavorites) {
      updateOldFavorites();
    }
  }, [favorites, hasUpdatedFavorites]);

  // Filter and sort favorites
  useEffect(() => {
    const favoriteArray = Object.values(favorites);

    const updatedFavorites = favoriteArray
      .filter(
        (repo: any) =>
          repo.name.toLowerCase().includes(query.toLowerCase()) &&
          repo.stargazers_count >= stars
      )
      .sort((a: any, b: any) =>
        order === "desc"
          ? b.stargazers_count - a.stargazers_count
          : a.stargazers_count - b.stargazers_count
      );

    setFilteredFavorites(updatedFavorites);
  }, [query, stars, order, favorites]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorLimit refetch={refetch} />;
  }

  if (Object.keys(favorites).length === 0) {
    return (
      <p className="text-center mt-[100px]">No favorite repositories yet.</p>
    );
  }

  const handleSearch = (
    newQuery: string,
    newStars: number,
    newOrder: string
  ) => {
    setQuery(newQuery);
    setStars(newStars);
    setOrder(newOrder);
  };

  return (
    <AnimatePresence mode="wait">
      <PageTransition>
        <div className="space-y-6">
          <div className="mb-8">
            <SearchBar
              onSearch={handleSearch}
              maxStars={Math.max(
                ...Object.values(favorites).map(
                  (repo: any) => repo.stargazers_count
                ),
                0
              )}
              query={query}
              stars={stars}
              order={order}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFavorites.map((repo: any) => (
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
