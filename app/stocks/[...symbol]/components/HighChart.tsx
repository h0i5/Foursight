import { useEffect, useState } from "react";
import DailyChart from "./charts/DailyChart";
import axios from "axios";
import { apiURL } from "@/app/components/apiURL";
import WeeklyChart from "./charts/WeeklyChart";
import MonthlyChart from "./charts/MonthlyChart";
import YearlyChart from "./charts/YearlyChart";

export default function HighChart(props: any) {
  const symbol = props.symbol;
  const [display, setDisplay] = useState("DAILY");
  const [dailyCandlesData, setDailyCandlesData] = useState([]);
  const [weeklyCandlesData, setWeeklyCandlesData] = useState([]);
  const [monthlyCandlesData, setMonthlyCandlesData] = useState([]);
  const [yearlyCandlesData, setYearlyCandlesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function getDailyCandlesData() {
      let data;
      try {
        data = await axios.post(`${apiURL}/getCandles`, {
          symbol: btoa(symbol),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
      setDailyCandlesData(data?.data.dailyCandles.data.candles);
      setWeeklyCandlesData(data?.data.weeklyCandles.data.candles);
      setMonthlyCandlesData(data?.data.monthlyCandles.data.candles);
      setYearlyCandlesData(data?.data.yearlyCandles.data.candles);
    }
    getDailyCandlesData();
  }, [symbol]);

  return (
    <div>
      <div>
        {display === "DAILY" && (
          <DailyChart data={dailyCandlesData} loading={loading} />
        )}
        {display === "WEEKLY" && (
          <WeeklyChart data={weeklyCandlesData} loading={loading} />
        )}
        {display === "MONTHLY" && (
          <MonthlyChart data={monthlyCandlesData} loading={loading} />
        )}
        {display === "YEARLY" && (
          <YearlyChart data={yearlyCandlesData} loading={loading} />
        )}
        <div className="flex text-xs font-mono flex-row justify-center gap-2 mt-4">
          <button
            className={`px-3 py-1 border border-[#374151] transition-colors ${
              display === "DAILY"
                ? "bg-black text-white border-black"
                : "bg-white text-black hover:bg-black/5"
            }`}
            onClick={() => setDisplay("DAILY")}
          >
            1D
          </button>
          <button
            className={`px-3 py-1 border border-[#374151] transition-colors ${
              display === "WEEKLY"
                ? "bg-black text-white border-black"
                : "bg-white text-black hover:bg-black/5"
            }`}
            onClick={() => setDisplay("WEEKLY")}
          >
            1W
          </button>
          <button
            className={`px-3 py-1 border border-[#374151] transition-colors ${
              display === "MONTHLY"
                ? "bg-black text-white border-black"
                : "bg-white text-black hover:bg-black/5"
            }`}
            onClick={() => setDisplay("MONTHLY")}
          >
            1M
          </button>
          <button
            className={`px-3 py-1 border border-[#374151] transition-colors ${
              display === "YEARLY"
                ? "bg-black text-white border-black"
                : "bg-white text-black hover:bg-black/5"
            }`}
            onClick={() => setDisplay("YEARLY")}
          >
            1Y
          </button>
        </div>
      </div>
    </div>
  );
}
