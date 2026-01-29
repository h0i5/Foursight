import Scrip from "../Scrip";

export default function TopGainers(props: { type: string; apiData: any }) {
  let topGainers = props.apiData;

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {topGainers?.map((scrip: any, index: number) => (
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
            marketCap={scrip.company.marketCap}
          />
        ))}
      </div>
    </div>
  );
}
