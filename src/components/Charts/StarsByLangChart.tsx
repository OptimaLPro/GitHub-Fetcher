import { fetchStarsData } from "@/api/charts";
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

const chartConfig = {
  stars: {
    label: "Stars",
    color: "#2563eb",
  },
} satisfies ChartConfig;

type DataProps = {
  [key: string]: number;
};

export function StarsByLang({ enabled }: { enabled: boolean }) {
  const { data, isLoading, isError, refetch } = useQuery<DataProps>({
    queryKey: ["stars-distribution"],
    queryFn: fetchStarsData,
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

  const structuredObject = Object.entries(data!).map(([language, stars]) => ({
    language,
    stars,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stars Distribution by Language</CardTitle>
        <CardDescription>
          Stars of Top 100 Repositories in each Language
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={structuredObject}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="language"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value} // Display language names
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="stars" fill="var(--color-stars)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
