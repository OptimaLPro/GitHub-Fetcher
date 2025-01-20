import { toggleFavorite } from "@/api/favorites";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { RepoDialog } from "../RepoDialog/RepoDialog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect } from "react";

type CardRepoProps = {
  repo: any;
  favorites: { [key: string]: boolean };
  setFavorites: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
};

const CardRepo: React.FC<CardRepoProps> = ({
  repo,
  favorites,
  setFavorites,
}) => {
  const handleToggleFavorite = async (repo: any) => {
    try {
      const isFavorite = favorites[repo.id];
      await toggleFavorite(repo, isFavorite);

      setFavorites((prev) => {
        const newFavorites = { ...prev };
        if (isFavorite) {
          delete newFavorites[repo.id];
        } else {
          newFavorites[repo.id] = true;
        }
        return newFavorites;
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    console.log("Favorites:", favorites);
  }, [favorites]);

  return (
    <Card key={repo.id} className="relative flex flex-col shadow-md">
      <motion.button
        onClick={() => handleToggleFavorite(repo)}
        className="absolute top-4 right-4"
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Heart
          size={24}
          className={favorites[repo.id] ? "text-red-500" : "text-gray-400"}
          fill={favorites[repo.id] ? "red" : "none"}
        />
      </motion.button>
      <CardHeader>
        <CardTitle>{repo.name}</CardTitle>
        <CardDescription>
          {repo.description || "No description provided."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Language: {repo.language || "Unknown"}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between mt-auto">
        <Button variant="secondary">
          ⭐ {repo.stargazers_count.toLocaleString()}
        </Button>
        <RepoDialog repo={repo} />
      </CardFooter>
    </Card>
  );
};

export default CardRepo;
