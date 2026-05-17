import BuySellWatch from "./BuySellWatch";

export default function LTP(props: any) {
  const isPositive = props.dayChange >= 0;
  const changeColor = isPositive ? "text-positive" : "text-negative";
  const changeBg = isPositive ? "bg-positive/10" : "bg-negative/10";
  const accentBar = isPositive ? "bg-positive" : "bg-negative";

  return (
    <div className="mb-8">
      <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
        <div className="flex-1 min-w-0">
          <p className="text-foreground/60 text-sm mb-2 truncate leading-snug">
            {props.companyName}
          </p>
          <p className="text-4xl md:text-5xl font-mono font-bold text-foreground mb-3 tabular-nums leading-none">
            ₹{props.ltp}
          </p>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 ${changeBg}`}>
            <span className={`text-xs flex-shrink-0 ${changeColor}`}>{isPositive ? "▲" : "▼"}</span>
            <span className={`text-sm font-mono font-semibold ${changeColor} tabular-nums`}>
              {isPositive ? "+" : ""}{props.dayChange.toFixed(2)}
              {" "}({isPositive ? "+" : ""}{props.dayChangePerc.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="hidden xl:block flex-shrink-0">
          <BuySellWatch
            companyName={props.companyName}
            symbol={props.symbol}
            ltp={props.ltp}
          />
        </div>
      </div>
    </div>
  );
}
