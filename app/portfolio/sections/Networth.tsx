"use client";
import { apiURL } from "@/app/components/apiURL";
import parseJwt from "@/app/components/navbar/utils/parseJwt";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import HoldingTable from "../components/HoldingTable";
import OrderTable from "../components/OrderTable";
import { NavTransition } from "@/app/components/navbar/NavTransition";
import Loading from "@/app/components/Loading";

export default function Networth(props: any) {
  const { data, profitDetails, loading } = props;
  const [chartArray, setChartArray] = useState<any[]>([]);

  // Clean, consistent color palette matching design system
  const COLORS = [
    "#037a68", // Primary green (keep brand color)
    "#FF6B6B", // Coral red
    "#4ECDC4", // Turquoise
    "#45B7D1", // Sky blue
    "#FFA07A", // Light salmon
    "#98D8C8", // Mint green
    "#F7DC6F", // Bright yellow
    "#BB8FCE", // Lavender
    "#85C1E2", // Light blue
    "#F8B88B", // Peach
    "#A8E6CF", // Seafoam
    "#FFD93D", // Golden yellow
  ];

  useEffect(() => {
    if (data.scrips && data.scrips.length > 0) {
      setChartArray(
        data.scrips.map((scrip: any, index: number) => {
          return {
            name: scrip.scrip,
            value: scrip.quantity * scrip.buyPrice,
          };
        }),
      );
    } else {
      setChartArray([]);
    }
  }, [data.scrips]);

  const hasData = !loading && data && Object.keys(data).length > 0;
  const portfolioValue =
    hasData && data.spentCash !== undefined
      ? data.spentCash + (profitDetails?.overallProfit || 0)
      : 0;
  const overallProfit = hasData ? profitDetails?.overallProfit || 0 : 0;
  const profitPercent =
    hasData && data?.spentCash && data.spentCash > 0
      ? ((overallProfit / data.spentCash) * 100).toFixed(2)
      : "0.00";
  const isProfitPositive = overallProfit >= 0;

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="border border-[#374151] px-6 py-4 bg-white">
          <h2 className="text-xs font-mono text-black/60 uppercase tracking-wider mb-3">
            Portfolio Value
          </h2>
          {loading ? (
            <div className="flex items-center">
              <Loading />
            </div>
          ) : (
            <div className="flex flex-row items-baseline gap-3">
              <h1 className="text-2xl md:text-3xl font-mono font-semibold text-black">
                ₹{portfolioValue.toFixed(2)}
              </h1>
              <span
                className={`text-sm font-mono font-semibold ${
                  isProfitPositive ? "text-[#037a68]" : "text-[#ce0000]"
                }`}
              >
                {isProfitPositive ? "+" : ""}
                {overallProfit.toFixed(2)} ({isProfitPositive ? "+" : ""}
                {profitPercent}%)
              </span>
            </div>
          )}
        </div>

        <div className="border border-[#374151] px-6 py-4 bg-white">
          <h2 className="text-xs font-mono text-black/60 uppercase tracking-wider mb-3">
            Stocks
          </h2>
          {loading ? (
            <div className="flex items-center">
              <Loading />
            </div>
          ) : (
            <h1 className="text-2xl md:text-3xl font-mono font-semibold text-[#037a68]">
              {data.scrips?.length || 0}
            </h1>
          )}
        </div>

        <div className="border border-[#374151] px-6 py-4 bg-white">
          <h2 className="text-xs font-mono text-black/60 uppercase tracking-wider mb-3">
            Remaining Cash
          </h2>
          {loading ? (
            <div className="flex items-center">
              <Loading />
            </div>
          ) : (
            <h1 className="text-2xl md:text-3xl font-mono font-semibold text-black">
              ₹{data.remainingCash || 0}
            </h1>
          )}
        </div>

        <div className="border border-[#374151] p-6 bg-white sm:col-span-2 xl:col-span-2">
          <h2 className="text-base font-semibold font-mono mb-4 text-black">
            HOLDINGS
          </h2>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loading />
            </div>
          ) : (
            <HoldingTable
              profitData={
                profitDetails.profitArray ? profitDetails.profitArray : []
              }
              data={data.scrips ? data.scrips : []}
            />
          )}
        </div>

        <div className="border border-[#374151] p-6 bg-white sm:col-span-2 xl:col-span-1">
          <h2 className="text-base font-semibold font-mono mb-4 text-black">
            HOLDING CHART
          </h2>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loading />
            </div>
          ) : !chartArray || chartArray.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <p className="text-sm font-mono text-black/60">No holdings to display</p>
            </div>
          ) : (
            <div className="max-w-[320px] mx-auto px-4">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart margin={{ top: 10, right: 10, bottom: 40, left: 10 }}>
                  <Pie
                    data={chartArray}
                    cx="50%"
                    cy="45%"
                    labelLine={false}
                    label={({ percent }: { percent?: number }) =>
                      percent && percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ""
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#374151"
                    strokeWidth={1}
                  >
                    {chartArray.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #374151",
                      borderRadius: "0",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "11px",
                      padding: "8px",
                    }}
                    itemStyle={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: "11px",
                    }}
                    formatter={(value: any, name: any) => [
                      `₹${parseFloat(value).toFixed(2)}`,
                      name,
                    ]}
                  />
                  <Legend
                    wrapperStyle={{
                      fontSize: "10px",
                      fontFamily: "var(--font-geist-mono)",
                      paddingTop: "8px",
                    }}
                    iconType="square"
                    formatter={(value) => value}
                    layout="horizontal"
                    verticalAlign="bottom"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="border border-[#374151] p-6 bg-white sm:col-span-2 xl:col-span-3">
          <h2 className="text-base font-semibold font-mono mb-4 text-black">
            ORDER BOOK
          </h2>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loading />
            </div>
          ) : (
            <>
              <OrderTable data={data.orderBook ? data.orderBook : []} />
              {data.orderBook?.length > 0 && (
                <div className="mt-4 text-right">
                  <NavTransition
                    href="/portfolio/orders"
                    className="text-sm font-mono text-[#037a68] hover:underline"
                  >
                    VIEW ALL
                  </NavTransition>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
