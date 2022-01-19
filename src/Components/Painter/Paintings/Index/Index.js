import { useSelector } from "react-redux";
import Buda from "./Buda";
import Fanny from "./Fanny";

const Index = function Index() {
  const painter = useSelector((state) => state.currentPainter.painter);

  if (painter && painter.rank === 2) {
    return <Fanny />;
  }
  if (painter && painter.rank === 1) {
    return <Buda painter={painter} />;
  }
  return "";
};

export default Index;
