import IndicesComponent from "../components/IndicesComponent";
import ScrollableContainer from "../components/ScrollableContainer";

export default function IndicesSection(props: any) {
  const data = props;
  const indicesList = {
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
      data: data.data?.data?.exchangeAggRespMap.NSE.indexLivePointsMap.BANKNIFTY,
    },
    NIFTYMIDSELECT: {
      name: "NIFTYMIDSELECT",
      data: data.data?.data?.exchangeAggRespMap.NSE.indexLivePointsMap.NIFTYMIDSELECT,
    },
    FINNIFTY: {
      name: "FINNIFTY",
      data: data.data?.data?.exchangeAggRespMap.NSE.indexLivePointsMap.FINNIFTY,
    },
  };

  return (
    <div className="w-full">
      <div className="border-t border-dashed border-border pt-4 mb-4">
        <span className="text-xs font-mono text-muted-foreground tracking-wider">01 / INDICES</span>
      </div>
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
