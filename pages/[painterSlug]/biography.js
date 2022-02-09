import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SEO from "../../components/SEO";
import { updateActiveMenu } from "../../store/menuSlice/currentMenuSlice";
import Biography from "../../components/Painter/Biography/Biography";

const Index = function Index() {
  const painter = useSelector((state) => state.currentPainter.painter);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateActiveMenu("Biography"));
  }, []);

  if (painter) {
    return (
      <>
        <SEO
          description={painter.about}
          title="Biography"
          siteTitle={painter.name}
        />
        <Biography />
      </>
    );
  }
  return null;
};

export default Index;
