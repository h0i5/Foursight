"use client";
import { useEffect, useState } from "react";
import MoversGrid from "./components/sections/MoversGrid";
import axios from "axios";
import { apiURL } from "../components/apiURL";

export default function TopMovers() {
  const [topMovers, setTopMovers] = useState({
    TOP_GAINERS: { items: [] },
    TOP_LOSERS: { items: [] },
    TOP_VOLUME: { items: [] },
  });
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState("Gainers");

  useEffect(() => {
    async function getTopMoverData() {
      try {
        const data = await axios.post(`${apiURL}/topmovers`, { size: 10 });
        setTopMovers(data?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getTopMoverData();
  }, []);

  const tabs = [
    { key: "Gainers", label: "GAINERS" },
    { key: "Losers", label: "LOSERS" },
    { key: "Volume", label: "VOLUME" },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <div
          className="mt-8 mb-6"
        >
          <span className="text-xs font-mono text-muted-foreground tracking-wider">01 / TOP MOVERS</span>
        </div>

        <div className="flex flex-row gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setDisplay(tab.key)}
              className={`px-6 py-3 text-sm font-mono border border-border transition-colors ${
                display === tab.key
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-foreground hover:border-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col border border-border bg-card p-6 hover:bg-muted transition-colors h-full">
                <div className="h-6 w-32 bg-foreground/10 mb-2"></div>
                <div className="h-4 w-40 bg-foreground/10 mb-6"></div>
                <div className="flex flex-row items-baseline gap-3 mb-6">
                  <div className="h-7 w-24 bg-foreground/10"></div>
                  <div className="h-4 w-20 bg-foreground/10"></div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j}>
                      <div className="h-3 w-16 bg-foreground/10 mb-1"></div>
                      <div className="h-4 w-20 bg-foreground/10"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {display === "Gainers" && <MoversGrid apiData={topMovers.TOP_GAINERS.items} />}
            {display === "Losers" && <MoversGrid apiData={topMovers.TOP_LOSERS.items} />}
            {display === "Volume" && <MoversGrid apiData={topMovers.TOP_VOLUME.items} />}
          </div>
        )}
      </div>
    </div>
  );
}
