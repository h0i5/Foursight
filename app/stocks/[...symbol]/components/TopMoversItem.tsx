import { NavTransition } from "@/app/components/navbar/NavTransition";

export default function TopMoversItem({ data }: { data: any; accent?: string }) {
  const nseScriptCode = data.company.nseScriptCode;
  const companyName = data.company.companyName;
  const logoUrl = data.company.logoUrl;
  const ltp = data.stats.ltp.toFixed(2);
  const dayChange = data.stats.dayChange.toFixed(2);
  const dayChangePerc = data.stats.dayChangePerc.toFixed(2);
  const isPositive = Number(dayChange) >= 0;
  const changeColor = isPositive ? "text-positive" : "text-negative";

  return (
    <NavTransition
      href={`/stocks/${encodeURIComponent(nseScriptCode)}`}
      className="block hover:bg-muted transition-colors"
    >
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {logoUrl && (
            <img
              src={logoUrl}
              alt={companyName}
              className="w-5 h-5 object-contain flex-shrink-0 opacity-80"
            />
          )}
          <div className="min-w-0">
            <div className="text-xs font-mono font-semibold text-foreground truncate">
              {nseScriptCode}
            </div>
            <div className="text-[11px] text-foreground/55 truncate mt-0.5 max-w-[120px]">
              {companyName}
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-sm font-mono text-foreground tabular-nums">₹{ltp}</div>
          <div className={`text-xs font-mono tabular-nums ${changeColor}`}>
            {isPositive ? "+" : ""}{dayChangePerc}%
          </div>
        </div>
      </div>
    </NavTransition>
  );
}
