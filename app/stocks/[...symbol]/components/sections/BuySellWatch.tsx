"use client";
import Popup from "reactjs-popup";
import BuyPopup from "../handlers/BuyPopup";
import SellPopup from "../handlers/SellPopup";
import { apiURL } from "@/app/components/apiURL";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { useToast } from "@/app/hooks/use-toast";

export default function BuySellWatch(props: any) {
  let symbol = props.symbol || "";
  let token = getCookie("token");
  const { toast } = useToast();

  async function handleWatchlistAddition() {
    let results;
    try {
      results = await axios({
        method: "post",
        url: apiURL + "/transaction/addWatchlist",
        headers: { Authorization: "Bearer " + token },
        data: {
          scrip: decodeURIComponent(symbol),
        },
      });
    } catch (err: any) {
      results = err.response;
    }
    if (results?.status === 200) {
      toast({
        title: "Added to watchlist",
      });
    }
    if (results?.status === 409) {
      toast({
        title: "Already in watchlist!",
        variant: "destructive",
      });
    }
  }
  return (
    <div className="flex flex-row gap-2">
      <Popup
        contentStyle={{
          width: "fit-content",
          border: "1px solid #374151",
          borderRadius: "0",
          padding: "0",
          background: "white",
          animation: "modalFadeIn 0.2s ease-out",
        }}
        overlayStyle={{
          background: "rgba(0, 0, 0, 0.5)",
          animation: "overlayFadeIn 0.2s ease-out",
        }}
        trigger={
          <button className="px-4 py-2 bg-[#037a68] text-white text-xs font-mono border border-[#037a68] hover:bg-[#037a68]/90 transition-colors">
            BUY
          </button>
        }
        modal
        closeOnDocumentClick
        lockScroll
      >
        {(close: () => void) => (
          <BuyPopup
            companyName={props.companyName}
            symbol={decodeURIComponent(props.symbol)}
            ltp={props.ltp}
            onClose={close}
          />
        )}
      </Popup>

      <Popup
        contentStyle={{
          width: "fit-content",
          border: "1px solid #374151",
          borderRadius: "0",
          padding: "0",
          background: "white",
          animation: "modalFadeIn 0.2s ease-out",
        }}
        overlayStyle={{
          background: "rgba(0, 0, 0, 0.5)",
          animation: "overlayFadeIn 0.2s ease-out",
        }}
        trigger={
          <button className="px-4 py-2 bg-[#ce0000] text-white text-xs font-mono border border-[#ce0000] hover:bg-[#ce0000]/90 transition-colors">
            SELL
          </button>
        }
        modal
        closeOnDocumentClick
        lockScroll
      >
        {(close: () => void) => (
          <SellPopup
            companyName={props.companyName}
            symbol={decodeURIComponent(props.symbol)}
            ltp={props.ltp}
            onClose={close}
          />
        )}
      </Popup>
      
      <button
        onClick={handleWatchlistAddition}
        className="px-4 py-2 border border-[#374151] bg-white text-black text-xs font-mono hover:bg-black hover:text-white hover:border-black transition-colors"
      >
        WATCH
      </button>
    </div>
  );
}
