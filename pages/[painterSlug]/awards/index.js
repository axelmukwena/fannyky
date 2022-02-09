import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Awards from "../../../components/Painter/Awards/Awards";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";

const Index = function Index() {
  const router = useRouter();
  const { painterSlug } = router.query;

  const painter = useSelector((state) => state.currentPainter.painter);

  const [current, setCurrent] = useState(true);
  const [awards, setAwards] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateActiveMenu("Awards"));
    if (painterSlug && current) {
      getResource(`/${painterSlug}/awards`, setAwards);
    }
    return () => {
      setCurrent(false);
    };
  }, [painterSlug]);

  return (
    <>
      {painter && (
        <SEO
          description={painter.about}
          title="Awards"
          siteTitle={painter.name}
        />
      )}

      {awards ? <Awards awards={awards} router={router} /> : <Loading />}
    </>
  );
};

export default Index;
