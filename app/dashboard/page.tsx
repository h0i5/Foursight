"use client";
import { useEffect, useState } from "react";
import parseJwt from "../components/navbar/utils/parseJwt";
import { getCookie } from "cookies-next";
import marketCap from "./handlers/marketCap";
import getIndices from "./handlers/indices";
import IndicesSection from "./sections/IndicesSection";
import TopMoversSection from "./sections/TopMoversSection";
import getTopMovers from "./handlers/topMovers";
import TopMarketCap from "./components/TopMarketCap";
import Loading from "../components/Loading";
import MarqueeTicker from "../components/landing/MarqueeTicker";
import { DotmSquare6 } from "../components/ui/dotm-square-6";

export default function DashboardPage() {
  let token = getCookie("token");
  const [username, setUsername] = useState("");
  const [marketCapData, setMarketCapData] = useState<any>([]);
  const [indicesData, setIndicesData] = useState<any>({});
  const [topMovers, setTopMovers] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const tokenContents = parseJwt(token);
      setUsername(tokenContents?.username || "");
    }

    async function loadDashboard() {
      try {
        const [marketCapResult, indicesResult, topMoversResult] = await Promise.all([
          marketCap(),
          getIndices(),
          getTopMovers(),
        ]);
        setMarketCapData(marketCapResult?.data);
        setIndicesData(indicesResult?.data);
        setTopMovers(topMoversResult?.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [token]);

  const dateLabel = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  return (
    <>
      <MarqueeTicker />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className="mt-8 mb-10 flex items-start justify-between gap-4"
          >
            <div>
              <span className="text-xs font-mono text-muted-foreground tracking-wider">OVERVIEW</span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-1">
                Welcome back,{" "}
                {loading ? (
                  <span className="inline-flex items-center align-middle">
                    <Loading />
                  </span>
                ) : (
                  <span className="text-brand">{username}</span>
                )}
              </h1>
              <p className="text-sm font-mono text-foreground/50 mt-1 tracking-wider">
                NSE · LIVE · {dateLabel}
              </p>
            </div>
            <div className="hidden md:block flex-shrink-0">
              <DotmSquare6
                size={72}
                dotSize={6}
                speed={1.4}
                bloom
                opacityBase={0.25}
                opacityMid={0.55}
                color="rgb(var(--positive))"
              />
            </div>
          </div>

          <div className="space-y-14 mb-16">
            {loading ? (
              <>
                <div className="w-full">
                  <div className="border-t border-dashed border-border pt-4 mb-6 flex items-baseline gap-3">
                    <div className="h-3 w-20 bg-foreground/10"></div>
                  </div>
                  <div className="flex gap-3 overflow-x-auto">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex flex-col px-5 py-4 bg-card min-w-[160px] border border-border">
                        <div className="h-3 w-20 bg-foreground/10 mb-4 mt-1"></div>
                        <div className="h-6 w-24 bg-foreground/10 mb-2"></div>
                        <div className="h-3 w-16 bg-foreground/10"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="space-y-10">
                    {[1, 2].map((s) => (
                      <div key={s}>
                        <div className="border-t border-dashed border-border pt-4 mb-6">
                          <div className="h-3 w-24 bg-foreground/10"></div>
                        </div>
                        <div className="flex gap-3 overflow-x-auto">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col bg-card p-5 min-w-[180px] border border-border">
                              <div className="h-3 w-24 bg-foreground/10 mb-3 mt-1"></div>
                              <div className="h-4 w-16 bg-foreground/10 mb-4"></div>
                              <div className="h-6 w-20 bg-foreground/10 mb-2"></div>
                              <div className="h-3 w-14 bg-foreground/10"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="border-t border-dashed border-border pt-4 mb-6">
                    <div className="h-3 w-28 bg-foreground/10"></div>
                  </div>
                  <div className="border border-border bg-card">
                    <div className="border-b border-border px-4 py-3 bg-muted">
                      <div className="grid grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="h-3 w-16 bg-foreground/10"></div>
                        ))}
                      </div>
                    </div>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="border-b border-border px-4 py-3 last:border-b-0">
                        <div className="grid grid-cols-5 gap-4">
                          {[1, 2, 3, 4, 5].map((j) => (
                            <div key={j} className="h-4 w-20 bg-foreground/10"></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <IndicesSection data={indicesData} />
                </div>
                <div>
                  <TopMoversSection data={topMovers} />
                </div>
                <div>
                  <TopMarketCap data={marketCapData} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
