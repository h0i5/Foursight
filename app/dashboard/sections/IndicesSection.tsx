import { useEffect, useState } from "react";
import IndicesComponent from "../components/IndicesComponent";
import ScrollableContainer from "../components/ScrollableContainer";

export default function IndicesSection(props: any) {
  const data = props;
  let indicesData = [
    {
      SENSEX: {
        name: "SENSEX",
        data: data.data?.data?.exchangeAggRespMap.BSE.indexLivePointsMap["1"],
      },
      NIFTY: {
        name: "NIFTY",
        data: data.data?.data?.exchangeAggRespMap.NSE.indexLivePointsMap.NIFTY,
      },
      BANKNIFTY: {
        name: "BANKNIFTY",
        data: data.data?.data?.exchangeAggRespMap.NSE.indexLivePointsMap
          .BANKNIFTY,
      },
      NIFTYMIDSELECT: {
        name: "NIFTYMIDSELECT",
        data: data.data?.data?.exchangeAggRespMap.NSE.indexLivePointsMap
          .NIFTYMIDSELECT,
      },
      FINNIFTY: {
        name: "FINNIFTY",
        data: data.data?.data?.exchangeAggRespMap.NSE.indexLivePointsMap
          .FINNIFTY,
      },
    },
  ];
  const indicesList = indicesData[0];
  
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-black">Indices</h2>
      <ScrollableContainer>
        <IndicesComponent data={indicesList.SENSEX} />
        <IndicesComponent data={indicesList.NIFTY} />
        <IndicesComponent data={indicesList.BANKNIFTY} />
        <IndicesComponent data={indicesList.NIFTYMIDSELECT} />
        <IndicesComponent data={indicesList.FINNIFTY} />
      </ScrollableContainer>
    </div>
  );
}
