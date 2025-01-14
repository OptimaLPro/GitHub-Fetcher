import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RepoPropBlock from "./RepoPropBlock";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

import { RepoStatsChart } from "../Charts/RepoStatsChart";

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
          <DialogTitle>{repo.name}</DialogTitle>
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
        <RepoStatsChart repo={repo} />
        <DialogFooter className="flex justify-center">
          <Button onClick={() => RedirectGithub(repo.html_url)}>
            View on GitHub
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
