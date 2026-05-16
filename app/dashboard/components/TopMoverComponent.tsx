import { NavTransition } from "@/app/components/navbar/NavTransition";

export default function TopMoverComponent(props: any) {
  let { companyName, ltp, dayChange, dayChangePerc, symbol, logoUrl } = props;
  const isPositive = dayChange >= 0;

  return (
    <NavTransition
      className="block"
      href={`/stocks/${encodeURIComponent(symbol)}`}
    >
      <div className="relative flex flex-col bg-card p-5 min-w-[180px] border border-border hover:bg-muted transition-colors overflow-hidden">
        <div className={`absolute top-0 left-0 right-0 h-[2px] ${isPositive ? "bg-positive" : "bg-negative"}`} />
        <div className="flex flex-row items-center gap-2 mb-1 mt-1">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={companyName}
              className="w-5 h-5 object-contain flex-shrink-0 opacity-75"
            />
          )}
          <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase truncate">
            {symbol}
          </span>
        </div>
        <p className="text-xs text-foreground/50 mb-3 line-clamp-1 font-mono">{companyName}</p>
        <span className="text-xl font-mono font-semibold text-foreground mb-1">
          ₹{ltp}
        </span>
        <div className={`flex flex-row gap-1 text-xs font-mono font-medium ${isPositive ? "text-positive" : "text-negative"}`}>
          <span>{isPositive ? "+" : ""}{dayChange.toFixed(2)}</span>
          <span>({isPositive ? "+" : ""}{dayChangePerc.toFixed(2)}%)</span>
        </div>
      </div>
    </NavTransition>
  );
}
