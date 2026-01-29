import { NavTransition } from "@/app/components/navbar/NavTransition";

export default function OrderTable(props: any) {
  const { data } = props;
  
  if (!data || data.length === 0) {
    return (
      <div className="w-full overflow-x-auto">
        <div className="border border-[#374151] bg-white">
          <div className="px-4 py-12 text-center text-sm font-mono text-black/60">
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
      <div className="border border-[#374151] bg-white">
        <div className="border-b border-[#374151] px-4 py-3 bg-white">
          <div className="grid grid-cols-5 gap-4 text-xs font-mono font-semibold text-black/60 uppercase tracking-wider">
            <div className="text-left">SCRIP</div>
            <div className="text-right">QUANTITY</div>
            <div className="text-right">PRICE</div>
            <div className="text-right">TYPE</div>
            <div className="text-right">DATE</div>
          </div>
        </div>
        <div className="divide-y divide-[#374151]">
          {newArray.map((order: any) => {
            if (!order || !order.scrip) return null;
            const isSell = order.type === "SELL";
            const price = order.price || 0;
            const quantity = order.quantity || 0;
            const time = order.time ? new Date(order.time).toLocaleDateString() : "N/A";
            
            return (
              <div
                key={`${order.scrip}-${order.time || Math.random()}`}
                className="px-4 py-3 hover:bg-black/5 transition-colors"
              >
                <div className="grid grid-cols-5 gap-4 text-sm font-mono items-center">
                  <div className="text-left">
                    <NavTransition
                      href={`/stocks/${encodeURIComponent(order.scrip)}`}
                      className="font-semibold text-black hover:underline"
                    >
                      {order.scrip}
                    </NavTransition>
                  </div>
                  <div className="text-right text-black">
                    {quantity}
                  </div>
                  <div
                    className={`text-right font-semibold ${
                      isSell ? "text-[#ce0000]" : "text-[#037a68]"
                    }`}
                  >
                    ₹{price.toFixed(1)}
                  </div>
                  <div
                    className={`text-right font-semibold ${
                      isSell ? "text-[#ce0000]" : "text-[#037a68]"
                    }`}
                  >
                    {order.type || "N/A"}
                  </div>
                  <div className="text-right text-black">
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
