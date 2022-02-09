import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Publications from "../../../components/Painter/Publications/Publications";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";

const Index = function Index() {
  const router = useRouter();
  const { painterSlug } = router.query;

  const painter = useSelector((state) => state.currentPainter.painter);

  const [publications, setPublications] = useState(null);
  const [current, setCurrent] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateActiveMenu("Publications"));
    if (painterSlug && current) {
      getResource(`/${painterSlug}/publications`, setPublications);
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
          title="Publications"
          siteTitle={painter.name}
        />
      )}
      {publications ? (
        <Publications publications={publications} />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Index;
