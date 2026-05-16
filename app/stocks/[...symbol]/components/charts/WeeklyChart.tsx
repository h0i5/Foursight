"use client";

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/ui/chart";
import Loading from "@/app/components/Loading";
import { useChartColors } from "@/app/hooks/useChartColors";

export default function WeeklyChart(props: any) {
  const data = props.data || [];
  const loading = props.loading || false;
  const colors = useChartColors();

  let chartColor = colors.positive;
  if (data.length > 0 && data[0][1] > data[data.length - 1][1]) {
    chartColor = colors.negative;
  }

  const chartData = data.map((d: [number, number], index: number) => {
    return {
      index: index,
      timestamp: d[0] * 1000,
      price: d[1],
    };
  });

  const prices = chartData.map(
    (d: { timestamp: number; price: number }) => d.price
  );
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 100;

  const priceRange = maxPrice - minPrice;
  const orderOfMagnitude = Math.pow(
    10,
    Math.floor(Math.log10(priceRange || 1))
  );
  const niceStep =
    orderOfMagnitude *
    (priceRange / orderOfMagnitude < 1.5
      ? 1
      : priceRange / orderOfMagnitude < 3
      ? 2
      : priceRange / orderOfMagnitude < 7
      ? 5
      : 10);

  const niceMin = Math.floor(minPrice / niceStep) * niceStep;
  const niceMax = Math.ceil(maxPrice / niceStep) * niceStep;

  const yAxisDomain = [Math.max(0, niceMin), niceMax];

  const chartConfig = {
    price: {
      label: "Price",
      color: chartColor,
    },
  } satisfies ChartConfig;

  if (loading || !data || data.length === 0) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={colors.border} opacity={0.3} />
        <XAxis
          dataKey="index"
          type="category"
          tickFormatter={(value) => {
            const dataPoint = chartData.find(
              (d: { index: number; timestamp: number; price: number }) =>
                d.index === value
            );
            if (!dataPoint) return "";
            const date = new Date(dataPoint.timestamp);
            const dateStr = date.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              timeZone: "Asia/Kolkata",
            });
            const timeStr = date.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Kolkata",
            });
            return `${dateStr}, ${timeStr}`;
          }}
          stroke={colors.border}
          tick={{ fill: colors.foreground, fontSize: 11 }}
          tickLine={{ stroke: colors.border }}
          interval="preserveStartEnd"
        />
        <YAxis
          domain={yAxisDomain}
          tickFormatter={(value) => `₹${value.toFixed(2)}`}
          stroke={colors.border}
          tick={{ fill: colors.foreground, fontSize: 11 }}
          tickLine={{ stroke: colors.border }}
          allowDecimals={true}
        />
        <ChartTooltip
          content={({ active, payload }) => {
            if (!active || !payload || !payload[0]) return null;
            const data = payload[0].payload;
            const date = new Date(data.timestamp);
            const formattedDate = date.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              timeZone: "Asia/Kolkata",
            });
            const formattedTime = date.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Kolkata",
            });
            const price = `₹${Number(data.price).toFixed(2)}`;

            return (
              <div className="font-mono border border-border bg-card text-foreground px-3 py-2">
                <div className="text-xs text-foreground/70">
                  {formattedDate}, {formattedTime}
                </div>
                <div className="text-sm font-semibold text-foreground">{price}</div>
              </div>
            );
          }}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke={chartColor}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
