"use client";

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/ui/chart";
import Loading from "@/app/components/Loading";

export default function YearlyChart(props: any) {
  const data = props.data || [];
  const loading = props.loading || false;

  const chartColor = "#037a68";

  // Format data: [timestamp (seconds), price] -> { timestamp: number (ms), price: number }
  const chartData = data.map((d: [number, number]) => {
    return {
      timestamp: d[0] * 1000, // Convert seconds to milliseconds (as number)
      price: d[1],
    };
  });

  // Calculate Y-axis domain with uniform scaling
  const prices = chartData.map(
    (d: { timestamp: number; price: number }) => d.price
  );
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 100;

  // Calculate nice round numbers for uniform ticks
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

  // Round min down and max up to nice intervals
  const niceMin = Math.floor(minPrice / niceStep) * niceStep;
  const niceMax = Math.ceil(maxPrice / niceStep) * niceStep;

  const yAxisDomain = [
    Math.max(0, niceMin), // Don't go below 0
    niceMax,
  ];

  const chartConfig = {
    price: {
      label: "Price",
      color: chartColor,
    },
  } satisfies ChartConfig;

  if (loading || !data || data.length === 0) {
    return (
      <div className="h-[400px] w-full border border-[#374151] bg-white flex items-center justify-center">
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
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
        <XAxis
          dataKey="timestamp"
          type="number"
          scale="time"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-IN", {
              month: "short",
              year: "numeric",
              timeZone: "Asia/Kolkata",
            });
          }}
          stroke="#374151"
          tick={{ fill: "#374151", fontSize: 11 }}
          tickLine={{ stroke: "#374151" }}
        />
        <YAxis
          domain={yAxisDomain}
          tickFormatter={(value) => `₹${value.toFixed(2)}`}
          stroke="#374151"
          tick={{ fill: "#374151", fontSize: 11 }}
          tickLine={{ stroke: "#374151" }}
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
            const price = `₹${Number(data.price).toFixed(2)}`;

            return (
              <div className="font-mono border border-[#374151] bg-white text-black px-3 py-2">
                <div className="text-xs text-black/70">{formattedDate}</div>
                <div className="text-sm font-semibold text-black">{price}</div>
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
