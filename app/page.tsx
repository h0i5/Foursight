import { NavTransition } from "./components/navbar/NavTransition";
import MarqueeTicker from "./components/landing/MarqueeTicker";
import { MiniSparkMain, MiniSparkTall } from "./components/landing/MiniSpark";
import LandingSearch from "./components/landing/LandingSearch";

const PORTFOLIO_HOLDINGS = [
  { symbol: "RELIANCE", qty: 12, change: "+2.41%", positive: true },
  { symbol: "INFY", qty: 8, change: "-0.87%", positive: false },
  { symbol: "HDFCBANK", qty: 20, change: "+1.13%", positive: true },
];

const WATCHLIST_ITEMS = [
  { symbol: "TCS", ltp: "3,812.40" },
  { symbol: "TATAMOTORS", ltp: "812.45" },
  { symbol: "BAJFINANCE", ltp: "6,914.55" },
  { symbol: "SUNPHARMA", ltp: "1,572.80" },
];

const TOP_GAINERS = [
  { symbol: "TATAMOTORS", pct: "+3.07%" },
  { symbol: "INFY", pct: "+2.11%" },
  { symbol: "BAJFINANCE", pct: "+1.39%" },
];

const TOP_LOSERS = [
  { symbol: "ADANIENT", pct: "-1.82%" },
  { symbol: "AXISBANK", pct: "-0.61%" },
  { symbol: "HDFCBANK", pct: "-0.43%" },
];

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-block font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-4">
      {label}
    </span>
  );
}

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-0">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.92] mb-6 sm:mb-8 max-w-4xl"
          >
            Practice trading<br />
            Indian stocks.<br />
            <span className="font-mono" style={{ color: "rgb(var(--positive))" }}>
              Zero rupees at risk.
            </span>
          </h1>

          <p
            className="text-base sm:text-lg text-foreground/60 max-w-xl mb-8 sm:mb-10 leading-relaxed"
          >
            Foursight is a free, open-source paper trading terminal for NSE.
            Practice on live data from 2000+ stocks — build your strategy,
            place trades, and track P&amp;L. No real money, ever.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 mb-12 sm:mb-16"
          >
            <NavTransition
              href="/signup"
              className="px-6 sm:px-8 py-3 sm:py-4 text-background bg-foreground hover:bg-foreground/90 transition-colors text-sm font-mono border border-foreground text-center"
          >
              START PAPER TRADING →
            </NavTransition>
            <NavTransition
              href="/dashboard"
              className="px-6 sm:px-8 py-3 sm:py-4 text-foreground bg-card hover:bg-muted transition-colors text-sm font-mono border border-border text-center"
          >
              OPEN DASHBOARD
            </NavTransition>
          </div>
        </div>

        <div>
          <MarqueeTicker />
        </div>
      </section>

      {/* ── STAT STRIP ────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-l border-border">
            {[
              { value: "2000+", label: "NSE-LISTED SCRIPS" },
              { value: "₹2.5L", label: "VIRTUAL CAPITAL" },
              { value: "1D·1W·1M·1Y", label: "CHART RANGES" },
              { value: "MIT", label: "LICENSE" },
            ].map((stat) => (
              <div key={stat.label} className="border-t border-r border-border p-5 sm:p-6 lg:p-8">
                <div className="font-mono text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-1 break-words">
                  {stat.value}
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-muted-foreground uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LandingSearch />

      {/* ── FEATURES — BENTO ─────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-12">
            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
              FEATURES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-3 leading-tight">
              Real prices.<br />Simulated trades. Real learning.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border">

            {/* DATA — col-span-2 */}
            <div className="sm:col-span-2 bg-card p-5 sm:p-8 hover:bg-muted transition-colors duration-200 flex flex-col justify-between gap-5 sm:gap-6">
              <div>
                <Chip label="DATA" />
                <h3 className="font-mono text-sm uppercase tracking-wider text-foreground mb-2">
                  Live data · 2000+ scrips
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  Real-time NSE prices, volume, open/high/low/close, 52-week ranges — refreshed continuously.
                </p>
              </div>
              <div className="flex items-end gap-4 sm:gap-6 flex-wrap">
                <MiniSparkMain />
                <div className="flex flex-col gap-1 pb-1">
                  <span className="font-mono text-xs text-muted-foreground">RELIANCE</span>
                  <span className="font-mono text-lg font-semibold text-foreground">₹2,941.55</span>
                  <span className="font-mono text-xs" style={{ color: "rgb(var(--positive))" }}>+1.24% today</span>
                </div>
              </div>
            </div>

            {/* CHARTS — row-span-2 on md+ */}
            <div className="sm:col-span-2 md:col-span-1 md:row-span-2 bg-card p-5 sm:p-8 hover:bg-muted transition-colors duration-200 flex flex-col gap-5 sm:gap-6 border-b border-border">
              <div>
                <Chip label="CHARTS" />
                <h3 className="font-mono text-sm uppercase tracking-wider text-foreground mb-2">
                  Advanced charting
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  Candle &amp; line charts across four timeframes. Tooltips with IST timestamps.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 flex-grow justify-center">
                <span className="font-mono text-3xl font-bold" style={{ color: "rgb(var(--positive))" }}>
                  +1.42%
                </span>
                <MiniSparkTall />
                <div className="flex flex-wrap gap-2 mt-2">
                  {["1D", "1W", "1M", "1Y"].map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] border border-border px-2 py-1 text-muted-foreground hover:border-muted-foreground transition-colors"
          >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider truncate">
                TIMEFRAMES: 1D · 1W · 1M · 1Y
              </p>
            </div>

            {/* PORTFOLIO */}
            <div className="bg-card p-5 sm:p-8 hover:bg-muted transition-colors duration-200 flex flex-col gap-4">
              <div>
                <Chip label="PORTFOLIO" />
                <h3 className="font-mono text-sm uppercase tracking-wider text-foreground mb-1">
                  Paper portfolio
                </h3>
              </div>
              <div className="border border-border p-4 bg-background">
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1">NET WORTH</div>
                <div className="font-mono text-lg sm:text-xl font-bold text-foreground mb-4">₹2,61,430.75</div>
                <div className="flex flex-col gap-2">
                  {PORTFOLIO_HOLDINGS.map((h) => (
                    <div key={h.symbol} className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-foreground shrink-0">{h.symbol}</span>
                      <span className="font-mono text-xs text-muted-foreground">{h.qty} shares</span>
                      <span
                        className="font-mono text-xs font-medium shrink-0"
                        style={{ color: h.positive ? "rgb(var(--positive))" : "rgb(var(--negative))" }}
          >
                        {h.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* WATCHLIST */}
            <div className="bg-card p-5 sm:p-8 hover:bg-muted transition-colors duration-200 flex flex-col gap-4 border-b border-border">
              <div>
                <Chip label="WATCHLIST" />
                <h3 className="font-mono text-sm uppercase tracking-wider text-foreground mb-1">
                  Customizable watchlists
                </h3>
              </div>
              <div className="border border-border bg-background divide-y divide-border">
                {WATCHLIST_ITEMS.map((w) => (
                  <div key={w.symbol} className="flex items-center justify-between px-3 sm:px-4 py-2.5">
                    <span className="font-mono text-xs font-semibold text-foreground">{w.symbol}</span>
                    <span className="font-mono text-xs text-muted-foreground">₹{w.ltp}</span>
                  </div>
                ))}
                <div className="flex items-center px-3 sm:px-4 py-2.5">
                  <span className="font-mono text-xs text-muted-foreground">+ ADD SCRIP</span>
                </div>
              </div>
            </div>

            {/* MOVERS */}
            <div className="bg-card p-5 sm:p-8 hover:bg-muted transition-colors duration-200 flex flex-col gap-4">
              <div>
                <Chip label="MOVERS" />
                <h3 className="font-mono text-sm uppercase tracking-wider text-foreground mb-1">
                  Live top movers
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: "rgb(var(--positive))" }}>GAINERS</div>
                  <div className="flex flex-col gap-1.5">
                    {TOP_GAINERS.map((g) => (
                      <div key={g.symbol} className="flex flex-col">
                        <span className="font-mono text-[11px] font-semibold text-foreground leading-tight">{g.symbol}</span>
                        <span className="font-mono text-[11px]" style={{ color: "rgb(var(--positive))" }}>{g.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider mb-2" style={{ color: "rgb(var(--negative))" }}>LOSERS</div>
                  <div className="flex flex-col gap-1.5">
                    {TOP_LOSERS.map((l) => (
                      <div key={l.symbol} className="flex flex-col">
                        <span className="font-mono text-[11px] font-semibold text-foreground leading-tight">{l.symbol}</span>
                        <span className="font-mono text-[11px]" style={{ color: "rgb(var(--negative))" }}>{l.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* OSS — col-span-2 */}
            <div className="sm:col-span-2 bg-card p-5 sm:p-8 hover:bg-muted transition-colors duration-200 flex flex-col justify-between gap-5 sm:gap-6">
              <div>
                <Chip label="OSS" />
                <h3 className="font-mono text-sm uppercase tracking-wider text-foreground mb-2">
                  Open source · MIT license
                </h3>
                <p className="text-sm text-foreground/50">
                  Built in public. Read the code, open an issue, or send a PR.
                </p>
              </div>
              <div className="bg-background border border-border p-4 font-mono text-xs sm:text-sm flex flex-col gap-2 overflow-hidden">
                <div className="flex gap-1 min-w-0">
                  <span className="text-muted-foreground shrink-0">&gt; </span>
                  <span className="text-foreground truncate">github.com/h0i5/foursight</span>
                </div>
                <div>
                  <span className="text-muted-foreground">&gt; </span>
                  <a
                    href="https://github.com/h0i5/foursight"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                    style={{ color: "rgb(var(--positive))" }}
          >
                    ★ STAR ON GITHUB →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-12">
            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
              FLOW
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-3">
              Up and running<br className="hidden sm:block" /> in under a minute.
            </h2>
          </div>
          <div className="flex flex-col divide-y divide-border border-t border-border">
            {[
              {
                n: "01",
                title: "Create a free account",
                sub: "No card. No deposit. No real money, ever. Just sign up and start — it's fully open source.",
              },
              {
                n: "02",
                title: "Build your watchlist",
                sub: "Search across 2000+ NSE-listed scrips. Track the stocks you care about in real time.",
              },
              {
                n: "03",
                title: "Place your first paper trade",
                sub: "Buy and sell with ₹2.5L virtual capital. Watch your P&L move on real market data. Nothing real is on the line.",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 md:gap-12 py-6 sm:py-8"
          >
                <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-muted-foreground/30 shrink-0 sm:w-16">
                  {step.n}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 md:gap-12 flex-1">
                  <h3 className="font-semibold text-lg sm:text-xl text-foreground sm:w-56 md:w-64 shrink-0">
                    {step.title}
                  </h3>
                  <p className="text-foreground/50 text-sm leading-relaxed max-w-xl">
                    {step.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 sm:mt-12 border-t border-border pt-8 sm:pt-10">
            <NavTransition
              href="/signup"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-background bg-foreground hover:bg-foreground/90 transition-colors text-sm font-mono border border-foreground"
          >
              CREATE FREE ACCOUNT →
            </NavTransition>
          </div>
        </div>
      </section>
    </>
  );
}
