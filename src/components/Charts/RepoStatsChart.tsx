import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
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

export function RepoStatsChart({ repo }: any) {
  const chartData = [
    {
      label: "Stars",
      value: repo.stargazers_count,
      fill: "#2563eb",
    },
    { label: "Forks", value: repo.forks_count, fill: "#90c7fe" },
  ];

  const chartConfig = {
    visitors: {
      label: "Repository Stats",
    },
    stars: {
      label: "Stars",
      color: "hsl(var(--chart-1))",
    },
    forks: {
      label: "Forks",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Repository Stats</CardTitle>
        <CardDescription>{repo.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {repo.stargazers_count > repo.forks_count
            ? "Stars outnumber forks"
            : "Forks gaining momentum"}{" "}
          <TrendingUp className="w-4 h-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Breakdown of stars and forks for this repository
        </div>
      </CardFooter>
    </Card>
  );
}
