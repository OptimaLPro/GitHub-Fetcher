import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useRepositories from "@/hooks/useRepositories";
import { useState } from "react";
import Loader from "@/components/ui/Loader";

const RepositoryList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useRepositories(page, 10);

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading repositories.</p>;

  return (
    <div className="space-y-4">
      {data.items.map((repo: any) => (
        <Card key={repo.id}>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <Button variant="secondary">⭐ {repo.stargazers_count}</Button>
        </Card>
      ))}
      <div className="flex justify-between">
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Previous
        </Button>
        <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default RepositoryList;
