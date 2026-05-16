import Scrip from "../Scrip";

export default function MoversGrid({ apiData }: { apiData: any[] }) {
  if (!apiData || apiData.length === 0) {
    return (
      <div className="border border-border bg-card py-12 text-center">
        <p className="text-sm font-mono text-foreground/60">No data available</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {apiData.map((scrip: any, index: number) => {
        const marketCap =
          scrip.company?.marketCap ||
          scrip.marketCap ||
          scrip.company?.market_cap ||
          null;

        return (
          <Scrip
            key={index}
            title={scrip.company.companyName}
            ltp={scrip.stats.ltp}
            symbol={scrip.company.nseScriptCode}
            change={scrip.stats.dayChange.toFixed(2)}
            changePercent={scrip.stats.dayChangePerc.toFixed(2)}
            opening={scrip.stats.high}
            closing={scrip.stats.close}
            equityType={scrip.company.equityType}
            yearlyHigh={scrip.stats.yearHighPrice}
            yearlyLow={scrip.stats.yearLowPrice}
            marketCap={marketCap}
            logoUrl={scrip.company.logoUrl}
          />
        );
      })}
    </div>
  );
}
