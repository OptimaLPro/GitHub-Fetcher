import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface CardRepoProps {
  repo: any;
  favorites: { [key: string]: boolean };
  setFavorites: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
}

const CardRepo: React.FC<CardRepoProps> = ({
  repo,
  favorites,
  setFavorites,
}) => {
  const RedirectGithub = (url: string) => {
    window.open(url, "_blank");
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = { ...prev, [id]: !prev[id] };
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <Card key={repo.id} className="relative flex flex-col shadow-md">
      <motion.button
        onClick={() => toggleFavorite(repo.id)}
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
        <Button variant="secondary">⭐ {repo.stargazers_count}</Button>
        <Button onClick={() => RedirectGithub(repo.html_url)}>View Repo</Button>
      </CardFooter>
    </Card>
  );
};

export default CardRepo;
