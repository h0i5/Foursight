"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { apiURL } from "../../apiURL";
import TopGainers from "./TopGainers";
import TopLosers from "./TopLosers";
import TopVolume from "./TopVolume";
import Loading from "../../Loading";

export default function TopMovers() {
  const [topMovers, setTopMovers] = useState({
    TOP_GAINERS: {
      items: [],
    },
    TOP_LOSERS: {
      items: [],
    },
    TOP_VOLUME: {
      items: [],
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTopMoverData() {
      let data;
      try {
        data = await axios.post(`${apiURL}/topmovers`, {
          size: 10,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
      setTopMovers(data?.data);
      return data?.data;
    }
    getTopMoverData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col space-y-12">
        <div>
          <div className="h-6 w-32 bg-black/10 mb-4"></div>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col border border-[#374151] bg-white p-6 min-w-[450px] md:min-w-[500px]"
              >
                <div className="h-5 w-32 bg-black/10 mb-4"></div>
                <div className="h-6 w-24 bg-black/10 mb-6"></div>
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j}>
                      <div className="h-3 w-16 bg-black/10 mb-1"></div>
                      <div className="h-4 w-20 bg-black/10"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="h-6 w-32 bg-black/10 mb-4"></div>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col border border-[#374151] bg-white p-6 min-w-[450px] md:min-w-[500px]"
              >
                <div className="h-5 w-32 bg-black/10 mb-4"></div>
                <div className="h-6 w-24 bg-black/10 mb-6"></div>
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j}>
                      <div className="h-3 w-16 bg-black/10 mb-1"></div>
                      <div className="h-4 w-20 bg-black/10"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="h-6 w-32 bg-black/10 mb-4"></div>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col border border-[#374151] bg-white p-6 min-w-[450px] md:min-w-[500px]"
              >
                <div className="h-5 w-32 bg-black/10 mb-4"></div>
                <div className="h-6 w-24 bg-black/10 mb-6"></div>
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j}>
                      <div className="h-3 w-16 bg-black/10 mb-1"></div>
                      <div className="h-4 w-20 bg-black/10"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {topMovers.TOP_GAINERS && (
        <TopGainers type="Gainers" apiData={topMovers.TOP_GAINERS.items} />
      )}
      {topMovers.TOP_GAINERS && (
        <TopLosers type="Losers" apiData={topMovers.TOP_LOSERS.items} />
      )}
      {topMovers.TOP_VOLUME && (
        <TopVolume type="Volume" apiData={topMovers.TOP_VOLUME.items} />
      )}
    </div>
  );
}
