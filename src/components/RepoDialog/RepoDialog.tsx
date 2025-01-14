import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RepoStatsChart } from "../Charts/RepoStatsChart";
import RepoPropBlock from "./RepoPropBlock";
import { ExternalLink } from "lucide-react";

export function RepoDialog({ repo }: any) {
  const RedirectGithub = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-blue-600 hover:underline">
          <Button>Show More</Button>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[45%]">
        <DialogHeader>
          <DialogTitle className="text-3xl">{repo.name}</DialogTitle>
          <DialogDescription>
            {repo.description || "No description provided."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <RepoPropBlock
            label="Primary Language"
            value={repo.language || "Unknown"}
          />
          <RepoPropBlock
            label="Stars"
            value={repo.stargazers_count.toLocaleString()}
          />
          <RepoPropBlock
            label="Forks"
            value={repo.forks_count.toLocaleString()}
          />
          <RepoPropBlock
            label="Open Issues"
            value={repo.open_issues_count.toLocaleString()}
          />
          <RepoPropBlock
            label="Topics"
            value={repo.topics.length ? repo.topics.join(", ") : "None"}
          />
          <RepoPropBlock
            label="License"
            value={repo.license?.name || "Not specified"}
          />
        </div>
        <div className="w-[60%] mx-auto">
          <RepoStatsChart repo={repo} />
        </div>
        <DialogFooter className="flex justify-center">
          <Button onClick={() => RedirectGithub(repo.html_url)}>
            <ExternalLink />
            View on GitHub
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
