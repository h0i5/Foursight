"use client";
import { apiURL } from "@/app/components/apiURL";
import parseJwt from "@/app/components/navbar/utils/parseJwt";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import HoldingTable from "../components/HoldingTable";
import OrderTable from "../components/OrderTable";
import { NavTransition } from "@/app/components/navbar/NavTransition";

export default function Networth(props: any) {
  const { data, profitDetails } = props;
  const [scripArray, setScripArray] = useState([
    {
      scripName: "",
      scripValue: 10,
    },
  ]);
  const [chartArray, setChartArray] = useState([
    {
      title: "",
      value: 10,
      color: "#037a68",
    },
  ]);
  useEffect(() => {
    setScripArray(
      data.scrips?.map((scrip: any) => {
        return {
          scripName: scrip.scripName,
          scripValue: scrip.scripValue,
        };
      }),
    );

    let colorArray = [
      "#8BC1F7",
      "#519DE9",
      "#06C",
      "#004B95",
      "#002F5D",
      "#BDE2B9",
      "#7CC674",
      "#4CB140",
      "#38812F",
      "#23511E",
      "#A2D9D9",
      "#73C5C5",
      "#009596",
      "#005F60",
      "#003737",
      "#B2B0EA",
      "#8481DD",
      "#5752D1",
      "#3C3D99",
      "#2A265F",
      "#F9E0A2",
      "#F6D173",
      "#F4C145",
      "#F0AB00",
      "#C58C00",
      "#F4B678",
      "#EF9234",
      "#EC7A08",
      "#C46100",
      "#8F4700",
      "#C9190B",
      "#A30000",
      "#7D1007",
      "#470000",
      "#2C0000",
      "#F0F0F0",
      "#D2D2D2",
      "#B8BBBE",
      "#8A8D90",
      "#6A6E73",
    ];

    setChartArray(
      data.scrips?.map((scrip: any) => {
        return {
          title: scrip.scrip,
          value: scrip.quantity * scrip.buyPrice,
          color: colorArray[Math.floor(Math.random() * colorArray.length)],
        };
      }),
    );
  }, [data.scrips]);

  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-5">
        <div className="rounded-md border-2 px-4 py-2 overflow-y-scroll">
          <h1 className="text-[#696969] font-semibold mb-4 text-2xl ">
            {" "}
            Your Portfolio Value
          </h1>
          <div className="flex flex-row items-end">
            <h1 className="green-text font-extrabold text-3xl">
              {" "}
              ₹{(data.spentCash + profitDetails?.overallProfit).toFixed(2)}
            </h1>

            <div className="ml-2 font-extrabold text-base">
              {profitDetails?.overallProfit >= 0 ? (
                <span className="green-text ">
                  {" "}
                  +{profitDetails?.overallProfit.toFixed(2)}{" "}
                </span>
              ) : (
                <span className="red-text ">
                  {" "}
                  {parseInt(profitDetails?.overallProfit).toFixed(2)}(
                  {(isNaN(
                    100 -
                      ((parseInt(data?.spentCash) +
                        parseInt(profitDetails?.overallProfit)) /
                        parseInt(data?.spentCash)) *
                        100,
                  )
                    ? 0
                    : 100 -
                      ((parseInt(data?.spentCash) +
                        parseInt(profitDetails?.overallProfit)) /
                        parseInt(data?.spentCash)) *
                        100
                  ).toFixed(2)}
                  )%
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="rounded-md border-2 px-4 py-2">
          <h1 className="text-[#696969] font-semibold mb-4 text-2xl">
            {" "}
            Stocks
          </h1>
          <h1 className=" font-extrabold text-3xl green-text">
            {data.scrips?.length}
          </h1>
        </div>
        <div className="rounded-md border-2 px-4 py-2">
          <h1 className="text-[#696969] font-semibold mb-4 text-2xl">
            {" "}
            Remaining Cash
          </h1>
          <h1 className="text-[#5E5E5E] font-extrabold text-3xl">
            ₹ {data.remainingCash}
          </h1>
        </div>
        <div className="py-4 rounded-lg px-4 border-2">
          <h1 className="green-text font-semibold mb-4 text-2xl"> Holdings </h1>{" "}
          <HoldingTable
            profitData={
              profitDetails.profitArray ? profitDetails.profitArray : []
            }
            data={data.scrips ? data.scrips : []}
          />
        </div>
        <div className="p-5 border-2 rounded-lg">
          <h1 className="green-text font-semibold mb-4 text-2xl">
            {" "}
            Holding Chart{" "}
          </h1>{" "}
          <div className="p-5 rounded-xl border-2 ">
            <PieChart
              animate={true}
              animationDuration={500}
              label={({ dataEntry }) => dataEntry.title}
              labelStyle={{
                fontSize: "5px",
                fontFamily: "inherit",
                fontWeight: "bold",
              }}
              data={chartArray}
            />
          </div>
        </div>
        <div className="rounded-md border-2  p-5">
          <h1 className="green-text font-semibold mb-4 text-2xl">
            {" "}
            Order Book{" "}
          </h1>{" "}
          <OrderTable data={data.orderBook ? data.orderBook : []} />
          <h1
            className={`text-right my-2 green-text underline font-semibold ${data.orderBook?.length === 0 ? "hidden" : "block"} `}
          >
            <NavTransition className="" href="/portfolio/orders">
              View all
            </NavTransition>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
}
