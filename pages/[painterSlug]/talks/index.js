import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Talks from "../../../components/Painter/Talks/Talks";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";

const Index = function Index() {
  const router = useRouter();
  const { painterSlug } = router.query;

  const painter = useSelector((state) => state.currentPainter.painter);

  const [current, setCurrent] = useState(true);
  const [talks, setTalks] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateActiveMenu("Talks"));
    if (painterSlug && current) {
      getResource(`/${painterSlug}/talks`, setTalks);
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
          title="Talks"
          siteTitle={painter.name}
        />
      )}

      {talks ? <Talks talks={talks} /> : <Loading />}
    </>
  );
};

export default Index;
