"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

const POPULAR = [
  "RELIANCE", "TCS", "HDFCBANK", "INFY", "ICICIBANK",
  "WIPRO", "SBIN", "BAJFINANCE", "TATAMOTORS", "MARUTI",
];

export default function LandingSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/stocks?search=${encodeURIComponent(query.trim())}`);
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">EXPLORE</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">
            Search 2000+ NSE stocks.
          </h2>
        </div>

        <form onSubmit={handleSearch} className="flex items-stretch gap-0 mb-8 max-w-2xl">
          <div className="flex-1 flex items-center border border-border border-r-0 px-4 h-12 bg-card focus-within:border-foreground transition-colors">
            <CiSearch className="text-muted-foreground text-base shrink-0 mr-3" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name or symbol — e.g. INFY, Reliance..."
              className="bg-transparent focus:outline-none text-sm font-mono text-foreground placeholder:text-muted-foreground w-full"
            />
          </div>
          <button
            type="submit"
            className="px-6 h-12 bg-foreground text-background text-sm font-mono border border-foreground hover:bg-foreground/90 transition-colors shrink-0"
          >
            SEARCH →
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {POPULAR.map(s => (
            <Link
              key={s}
              href={`/stocks/${s}`}
              className="font-mono text-xs px-3 py-1.5 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
            >
              {s}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
