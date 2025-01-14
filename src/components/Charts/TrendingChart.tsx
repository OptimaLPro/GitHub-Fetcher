import { fetchTrendingData } from "@/api/charts";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import ErrorLimit from "../ui/ErrorLimit";
import Loader from "../ui/Loader";
import { RepoData } from "@/types/repoData";

const chartConfig = {
  stars: {
    label: "Stars",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function TrendingChart({ enabled }: { enabled: boolean }) {
  const { data, isLoading, isError, refetch } = useQuery<RepoData[]>({
    queryKey: ["trending-repos"],
    queryFn: () => fetchTrendingData(5, "month"),
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

  // Process the data to prepare it for the chart
  const structuredData = data!.slice(0, 5).map((repo) => ({
    name: repo.name,
    language: repo.language ?? "Unknown",
    stars: repo.stargazers_count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Trending Repositories (Last 30 Days)</CardTitle>
        <CardDescription>
          Stars distribution for the top repositories by language
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={structuredData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="stars" fill="var(--color-stars)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="font-semibold fill-foreground"
                fontSize={12}
                formatter={(value: number) => value.toLocaleString()}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
