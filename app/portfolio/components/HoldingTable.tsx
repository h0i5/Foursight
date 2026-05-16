import { NavTransition } from "@/app/components/navbar/NavTransition";

export default function HoldingTable(props: any) {
  const { data, profitData } = props;

  function getProfitsByScrip(scrip: string) {
    if (!profitData || profitData.length === 0) return "0.00";
    for (let i = 0; i < profitData.length; i++) {
      if (profitData[i].scrip === scrip) {
        return profitData[i].profit?.toFixed(2) || "0.00";
      }
    }
    return "0.00";
  }

  function getProfitPerScrip(scrip: string) {
    if (!profitData || profitData.length === 0) return "0.00";
    for (let i = 0; i < profitData.length; i++) {
      if (profitData[i].scrip === scrip) {
        return profitData[i].profitPerShare?.toFixed(2) || "0.00";
      }
    }
    return "0.00";
  }
  
  function getLTP(scrip: string) {
    if (!profitData || profitData.length === 0) return "0.00";
    for (let i = 0; i < profitData.length; i++) {
      if (profitData[i].scrip === scrip) {
        return profitData[i].ltp?.toFixed(2) || "0.00";
      }
    }
    return "0.00";
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="border border-border bg-card min-w-[800px]">
          <div className="px-6 py-12 text-center text-sm font-mono text-foreground/60">
            No holdings yet
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="border border-border bg-card min-w-[800px]">
        <div className="border-b border-border px-6 py-3 bg-muted">
          <div className="grid grid-cols-7 gap-6 text-xs font-mono font-semibold text-foreground/60 uppercase tracking-wider">
            <div className="text-left">SCRIP</div>
            <div className="text-right">QUANTITY</div>
            <div className="text-right">BUY</div>
            <div className="text-right">LTP</div>
            <div className="text-right">P/L</div>
            <div className="text-right">EPS</div>
            <div className="text-right">VALUE</div>
          </div>
        </div>
        <div className="divide-y divide-border">
          {data.map((holding: any) => {
            if (!holding || !holding.scrip) return null;
            const profit = parseFloat(getProfitsByScrip(holding.scrip) || "0");
            const profitPerShare = parseFloat(
              getProfitPerScrip(holding.scrip) || "0"
            );
            const isProfitPositive = profit > 0;
            const buyPrice = holding.buyPrice || 0;
            const quantity = holding.quantity || 0;
            
            return (
              <div
                key={holding.scrip}
                className="px-6 py-3 hover:bg-muted transition-colors"
              >
                <div className="grid grid-cols-7 gap-6 text-sm font-mono items-center">
                  <div className="text-left">
                    <NavTransition
                      href={`/stocks/${encodeURIComponent(holding.scrip)}`}
                      className="font-semibold text-foreground hover:underline"
                    >
                      {holding.scrip}
                    </NavTransition>
                  </div>
                  <div className="text-right text-foreground">
                    {quantity}
                  </div>
                  <div className="text-right text-foreground">
                    ₹{buyPrice.toFixed(1)}
                  </div>
                  <div className="text-right text-foreground">
                    ₹{getLTP(holding.scrip)}
                  </div>
                  <div
                    className={`text-right font-semibold ${
                      isProfitPositive ? "text-positive" : "text-negative"
                    }`}
                  >
                    {isProfitPositive ? "+" : ""}
                    {getProfitsByScrip(holding.scrip)}
                  </div>
                  <div
                    className={`text-right font-semibold ${
                      profitPerShare > 0 ? "text-positive" : "text-negative"
                    }`}
                  >
                    {profitPerShare > 0 ? "+" : ""}
                    {getProfitPerScrip(holding.scrip)}
                  </div>
                  <div className="text-right text-foreground">
                    ₹{(quantity * buyPrice).toFixed(0)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
