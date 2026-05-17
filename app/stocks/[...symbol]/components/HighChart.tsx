import { useEffect, useState } from "react";
import DailyChart from "./charts/DailyChart";
import axios from "axios";
import { apiURL } from "@/app/components/apiURL";
import WeeklyChart from "./charts/WeeklyChart";
import MonthlyChart from "./charts/MonthlyChart";
import YearlyChart from "./charts/YearlyChart";

const TABS = [
  { key: "DAILY", label: "1D" },
  { key: "WEEKLY", label: "1W" },
  { key: "MONTHLY", label: "1M" },
  { key: "YEARLY", label: "1Y" },
];

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
      <div className="border-t border-dashed border-border pt-4 mb-5 flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground tracking-wider">CHART</span>
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setDisplay(tab.key)}
              className={`px-3 py-1 text-xs font-mono border transition-colors ${
                display === tab.key
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-foreground border-border hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-border bg-card pt-4">
        {display === "DAILY" && <DailyChart data={dailyCandlesData} loading={loading} />}
        {display === "WEEKLY" && <WeeklyChart data={weeklyCandlesData} loading={loading} />}
        {display === "MONTHLY" && <MonthlyChart data={monthlyCandlesData} loading={loading} />}
        {display === "YEARLY" && <YearlyChart data={yearlyCandlesData} loading={loading} />}
      </div>
    </div>
  );
}
