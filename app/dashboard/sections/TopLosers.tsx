import { useState } from "react";
import TopMoverComponent from "../components/TopMoverComponent";
import ScrollableContainer from "../components/ScrollableContainer";

export default function TopLosers(props: any) {
  const { data } = props;
  const large = data?.LARGECAP.items ? data.LARGECAP.items : [];
  const medium = data?.MIDCAP.items ? data.MIDCAP.items : [];
  const small = data?.SMALLCAP.items ? data.SMALLCAP.items : [];
  const [display, setDisplay] = useState("LARGECAP");

  return (
    <div>
      <div className="flex flex-row gap-2 mb-4">
        <button
          onClick={() => setDisplay("LARGECAP")}
          className={`px-4 py-2 text-xs font-mono border border-border transition-colors ${
            display === "LARGECAP"
              ? "bg-foreground text-background border-foreground"
              : "bg-card text-foreground hover:border-foreground"
          }`}
        >
          LARGE
        </button>
        <button
          onClick={() => setDisplay("MIDCAP")}
          className={`px-4 py-2 text-xs font-mono border border-border transition-colors ${
            display === "MIDCAP"
              ? "bg-foreground text-background border-foreground"
              : "bg-card text-foreground hover:border-foreground"
          }`}
        >
          MID
        </button>
        <button
          onClick={() => setDisplay("SMALLCAP")}
          className={`px-4 py-2 text-xs font-mono border border-border transition-colors ${
            display === "SMALLCAP"
              ? "bg-foreground text-background border-foreground"
              : "bg-card text-foreground hover:border-foreground"
          }`}
        >
          SMALL
        </button>
      </div>

      <ScrollableContainer>
        {display === "LARGECAP" &&
          large.map((item: any, index: number) => (
            <TopMoverComponent
              key={index}
              companyName={item.company.companyName}
              ltp={item.stats.ltp}
              dayChange={item.stats.dayChange}
              dayChangePerc={item.stats.dayChangePerc}
              symbol={item.company.nseScriptCode}
              logoUrl={item.company.logoUrl}
            />
          ))}
        {display === "MIDCAP" &&
          medium.map((item: any, index: number) => (
            <TopMoverComponent
              key={index}
              companyName={item.company.companyName}
              ltp={item.stats.ltp}
              dayChange={item.stats.dayChange}
              dayChangePerc={item.stats.dayChangePerc}
              symbol={item.company.nseScriptCode}
              logoUrl={item.company.logoUrl}
            />
          ))}
        {display === "SMALLCAP" &&
          small.map((item: any, index: number) => (
            <TopMoverComponent
              key={index}
              companyName={item.company.companyName}
              ltp={item.stats.ltp}
              dayChange={item.stats.dayChange}
              dayChangePerc={item.stats.dayChangePerc}
              symbol={item.company.nseScriptCode}
              logoUrl={item.company.logoUrl}
            />
          ))}
      </ScrollableContainer>
    </div>
  );
}
