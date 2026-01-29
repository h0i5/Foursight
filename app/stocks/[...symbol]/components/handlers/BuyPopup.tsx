"use client";
import { apiURL } from "@/app/components/apiURL";
import Loading from "@/app/components/Loading";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { useToast } from "@/app/hooks/use-toast";

export default function BuyPopup(props: any) {
  let symbol = props.symbol || "";
  let token = getCookie("token");
  const { toast } = useToast();
  const onClose = props.onClose || (() => {});

  const [quantity, setQuantity] = useState(0);

  function updateQuantity(e: any) {
    const value = parseFloat(e.target.value) || 0;
    if (value < 0) {
      setQuantity(0);
    } else {
      setQuantity(value);
    }
  }
  const [loading, setLoading] = useState(false);

  async function handleBuy(e: any) {
    e.preventDefault();
    if (quantity <= 0) return;
    
    setLoading(true);
    const data = {
      symbol: decodeURIComponent(props.symbol),
      quantity: quantity,
    };
    let results;
    try {
      results = await axios({
        method: "post",
        url: apiURL + "/transaction/buyScrip",
        headers: { Authorization: "Bearer " + token },
        data: {
          scrip: decodeURIComponent(symbol),
          quantity: quantity,
        },
      });
    } catch (err: any) {
      results = err.response;
    } finally {
      setLoading(false);
    }
    
    if (results?.status === 200) {
      toast({
        title: `Successfully bought ${quantity} ${props.symbol}`,
      });
      setQuantity(0);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 500);
    } else if (results?.status === 401) {
      toast({
        title: "Insufficient Funds!",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Failed to buy the stock",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="bg-white p-6 min-w-[320px]">
      <div className="mb-6">
        <h1 className="text-xl font-bold font-mono text-[#037a68] mb-2">BUY</h1>
        <h2 className="text-lg font-semibold text-black">{props.companyName}</h2>
      </div>
      <div className="mb-6 text-sm font-mono text-black/70">
        LTP: <span className="text-black">₹{props.ltp}</span>
      </div>
      <form onSubmit={handleBuy}>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-mono text-black/60 uppercase tracking-wider mb-2 block">
              Quantity
            </label>
            <input
              type="number"
              className="w-full border border-[#374151] px-3 py-2 text-sm font-mono focus:outline-none focus:border-black transition-colors"
              value={quantity}
              onChange={updateQuantity}
              min="0"
            />
          </div>
          <div className="text-sm font-mono text-black">
            Total value: <span className="text-[#037a68]">₹{(quantity * props.ltp).toFixed(2)}</span>
          </div>
          <button
            type="submit"
            disabled={loading || quantity <= 0}
            className="w-full px-4 py-3 bg-[#037a68] text-white text-sm font-mono border border-[#037a68] hover:bg-[#037a68]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loading />
                <span className="ml-2">Buying...</span>
              </>
            ) : (
              "BUY"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
