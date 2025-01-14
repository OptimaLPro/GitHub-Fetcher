"use client";

import { fetchLanguageData } from "@/api/charts";
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
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import ErrorLimit from "../ui/ErrorLimit";
import Loader from "../ui/Loader";

export function LanguageChart({ enabled }: { enabled: boolean }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["languages"],
    queryFn: fetchLanguageData,
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

  const chartData = Object.entries(data!).map(([language, count], index) => ({
    language,
    count,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }));

  const chartConfig = chartData.reduce((config, { language, fill }) => {
    config[language] = {
      label: language,
      color: fill,
    };
    return config;
  }, {} as ChartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Programming Language Popularity</CardTitle>
        <CardDescription>Most starred repositories by language</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="language"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label || value
              }
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="count"
              strokeWidth={2}
              radius={8}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
