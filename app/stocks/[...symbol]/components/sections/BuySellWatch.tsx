"use client";
import Popup from "reactjs-popup";
import BuyPopup from "../handlers/BuyPopup";
import SellPopup from "../handlers/SellPopup";
import { apiURL } from "@/app/components/apiURL";
import axios from "axios";
import { getCookie } from "cookies-next";
import { sileo } from "sileo";
import React from "react";

export default function BuySellWatch(props: any) {
  let symbol = props.symbol || "";
  let token = getCookie("token");

  async function handleWatchlistAddition() {
    let results;
    try {
      results = await axios({
        method: "post",
        url: apiURL + "/transaction/addWatchlist",
        headers: { Authorization: "Bearer " + token },
        data: { scrip: decodeURIComponent(symbol) },
      });
    } catch (err: any) {
      results = err.response;
    }
    if (results?.status === 200) sileo.success({ title: "Added to watchlist" });
    if (results?.status === 409) sileo.error({ title: "Already in watchlist!" });
  }

  const popupStyle = {
    width: "fit-content",
    border: "1px solid rgb(var(--border))",
    borderRadius: "0",
    padding: "0",
    background: "rgb(var(--card))",
    animation: "modalFadeIn 0.2s ease-out",
  };

  const overlayStyle = {
    background: "rgba(0, 0, 0, 0.5)",
    animation: "overlayFadeIn 0.2s ease-out",
  };

  return (
    <div className="flex flex-row gap-2 w-full xl:w-auto">
      <Popup
        contentStyle={popupStyle}
        overlayStyle={overlayStyle}
        trigger={
          <button className="flex-1 px-5 py-2.5 bg-card border border-border text-positive text-xs font-mono font-semibold hover:bg-positive hover:text-white hover:border-positive transition-colors">
            BUY
          </button>
        }
        modal
        closeOnDocumentClick
        lockScroll
      >
        {/* @ts-ignore */}
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
        contentStyle={popupStyle}
        overlayStyle={overlayStyle}
        trigger={
          <button className="flex-1 px-5 py-2.5 bg-card border border-border text-negative text-xs font-mono font-semibold hover:bg-negative hover:text-white hover:border-negative transition-colors">
            SELL
          </button>
        }
        modal
        closeOnDocumentClick
        lockScroll
      >
        {/* @ts-ignore */}
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
        className="flex-1 px-5 py-2.5 border border-border bg-card text-foreground text-xs font-mono hover:bg-foreground hover:text-background hover:border-foreground transition-colors"
      >
        WATCH
      </button>
    </div>
  );
}
