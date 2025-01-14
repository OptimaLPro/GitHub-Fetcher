import { fetchTrendingData } from "@/api/charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import ErrorLimit from "../ui/ErrorLimit";
import Loader from "../ui/Loader";

const chartConfig = {
  stars: {
    label: "Stars",
    color: "#2563eb",
  },
} satisfies ChartConfig;

type RepoData = {
  name: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  size: number;
  watchers_count: number;
  created_at: string;
};

export function TopRepositoryInChart({ enabled }: { enabled: boolean }) {
  const { data, isLoading, isError, refetch } = useQuery<RepoData[]>({
    queryKey: ["top-repo-in"],
    queryFn: () => fetchTrendingData(1, "year"),
    retry: 0,
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled, // Only enable the query if the chart is selected
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorLimit refetch={refetch} />;
  }

  const chartData = data!
    .slice(0, 1)
    .map((repo) => [
      { item: "Stars", count: repo.stargazers_count },
      { item: "Forks", count: repo.forks_count },
      { item: "Issues", count: repo.open_issues_count },
      { item: "Size", count: repo.size },
      { item: "Watchers", count: repo.watchers_count },
      {
        item: "Age (Months)",
        count: Math.floor(
          (Date.now() - new Date(repo.created_at).getTime()) /
            (1000 * 60 * 60 * 24 * 30)
        ),
      },
    ])
    .flat();

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>{data![0].name} - Repository Insights</CardTitle>
        <CardDescription>Key metrics for the repository</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="item" />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Repository Stats
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Current Data
        </div>
      </CardFooter>
    </Card>
  );
}
