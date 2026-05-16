import { NavTransition } from "@/app/components/navbar/NavTransition";

export default function OrderTable(props: any) {
  const { data } = props;
  
  if (!data || data.length === 0) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="border border-border bg-card">
          <div className="px-4 py-12 text-center text-sm font-mono text-foreground/60">
            No orders yet
          </div>
        </div>
      </div>
    );
  }

  let length = data.length;
  let newArray = data.slice(length - 10, length).reverse();
  
  return (
    <div className="w-full overflow-x-auto">
      <div className="border border-border bg-card">
        <div className="border-b border-border px-4 py-3 bg-muted">
          <div className="grid grid-cols-5 gap-4 text-xs font-mono font-semibold text-foreground/60 uppercase tracking-wider">
            <div className="text-left">SCRIP</div>
            <div className="text-right">QUANTITY</div>
            <div className="text-right">PRICE</div>
            <div className="text-right">TYPE</div>
            <div className="text-right">DATE</div>
          </div>
        </div>
        <div className="divide-y divide-border">
          {newArray.map((order: any) => {
            if (!order || !order.scrip) return null;
            const isSell = order.type === "SELL";
            const price = order.price || 0;
            const quantity = order.quantity || 0;
            const time = order.time ? new Date(order.time).toLocaleDateString() : "N/A";
            
            return (
              <div
                key={`${order.scrip}-${order.time || Math.random()}`}
                className="px-4 py-3 hover:bg-muted transition-colors"
              >
                <div className="grid grid-cols-5 gap-4 text-sm font-mono items-center">
                  <div className="text-left">
                    <NavTransition
                      href={`/stocks/${encodeURIComponent(order.scrip)}`}
                      className="font-semibold text-foreground hover:underline"
                    >
                      {order.scrip}
                    </NavTransition>
                  </div>
                  <div className="text-right text-foreground">
                    {quantity}
                  </div>
                  <div
                    className={`text-right font-semibold ${
                      isSell ? "text-negative" : "text-positive"
                    }`}
                  >
                    ₹{price.toFixed(1)}
                  </div>
                  <div
                    className={`text-right font-semibold ${
                      isSell ? "text-negative" : "text-positive"
                    }`}
                  >
                    {order.type || "N/A"}
                  </div>
                  <div className="text-right text-foreground">
                    {time}
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
