import Link from "next/link";
import Scrip from "../../Scrip";
import ScrollableContainer from "../../../dashboard/components/ScrollableContainer";

export default function TopVolume(props: { type: string; apiData: any }) {
  let topVolume = props.apiData;

  return (
    <div className="mb-12 my-4">
      <Link href="/topmovers">
        <h1 className="text-2xl md:text-3xl font-bold font-mono mb-4">
          Top{" "}
          <span
            className={
              props.type === "Gainers"
                ? "text-[#037a68]"
                : props.type === "Losers"
                ? "text-[#ce0000]"
                : "text-black"
            }
          >
            {props.type}
          </span>{" "}
          this week
        </h1>
      </Link>
      <ScrollableContainer>
        {topVolume?.map((scrip: any, index: number) => (
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
      </ScrollableContainer>
    </div>
  );
}
