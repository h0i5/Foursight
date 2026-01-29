import BuySellWatch from "./BuySellWatch";

export default function LTP(props: any) {
  const isPositive = props.dayChange >= 0;
  const changeColor = isPositive ? "text-[#037a68]" : "text-[#ce0000]";
  
  return (
    <div className="mb-6">
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold mb-3 text-black">
            {props.companyName}
          </h1>
          <div className="flex flex-row items-baseline gap-3">
            <p className="text-2xl md:text-3xl font-mono text-black">
              ₹{props.ltp}
            </p>
            <p className={`text-base font-mono font-semibold ${changeColor}`}>
              {isPositive ? "+" : ""}
              {props.dayChange.toFixed(2)} ({isPositive ? "+" : ""}
              {props.dayChangePerc.toFixed(2)}%)
            </p>
          </div>
        </div>
        <div className="hidden xl:block">
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
