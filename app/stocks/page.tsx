"use client";
import Link from "next/link";
import TopMovers from "../components/sections/TopMovers/TopMovers";
import { useSearchParams } from "next/navigation";
import { symbols } from "../components/symbols";
import { Suspense } from "react";

function StocksPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const filteredSymbols = symbols.filter(
    (scrip) =>
      scrip["Company Name"].toLowerCase().includes(searchQuery.toLowerCase()) ||
      scrip["Scrip"].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 mb-16">
      <div className="max-w-7xl mx-auto">
        {searchQuery !== "" ? (
          <>
            <div className="mt-8 mb-6">
              <span className="text-xs font-mono text-muted-foreground tracking-wider">RESULTS</span>
            </div>
            <div className="mb-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Results for{" "}
                <span className="font-mono text-brand">"{searchQuery}"</span>
              </h1>
              <p className="text-xs font-mono text-muted-foreground tracking-wider mt-1">
                {filteredSymbols.length} MATCHES
              </p>
            </div>

            <div className="mt-6 mb-12">
              {filteredSymbols.length > 0 ? (
                <div className="flex flex-col border-y border-border divide-y divide-border">
                  {filteredSymbols.map((scrip) => (
                    <Link
                      key={scrip["Scrip"]}
                      href={`/stocks/${encodeURIComponent(scrip["Scrip"])}`}
                      className="flex items-center justify-between px-4 py-3 bg-card hover:bg-muted transition-colors"
                    >
                      <div>
                        <span className="text-xs font-mono text-muted-foreground tracking-wider block mb-0.5">
                          {scrip["Scrip"]}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {scrip["Company Name"]}
                        </span>
                      </div>
                      <span className="font-mono text-muted-foreground text-sm">→</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="border border-border bg-muted px-6 py-10 font-mono text-sm">
                  <div className="text-muted-foreground mb-1">
                    <span className="text-foreground/40">&gt; </span>
                    NO MATCHES FOR "{searchQuery.toUpperCase()}"
                  </div>
                  <div className="text-foreground/40">TRY A DIFFERENT QUERY</div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <span className="text-xs font-mono text-muted-foreground tracking-wider">TOP MOVERS</span>
            </div>
            <TopMovers />
          </>
        ) : (
          <>
            <div className="mt-8 mb-6">
              <span className="text-xs font-mono text-muted-foreground tracking-wider">EXPLORE</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
              Explore stocks
            </h1>
            <TopMovers />
          </>
        )}
      </div>
    </div>
  );
}

export default function Stocks() {
  return (
    <Suspense>
      <StocksPage />
    </Suspense>
  );
}
