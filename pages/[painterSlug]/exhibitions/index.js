import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Exhibitions from "../../../components/Painter/Exhibitions/Exhibitions";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";

const Index = function Index() {
  const router = useRouter();
  const { painterSlug } = router.query;

  const painter = useSelector((state) => state.currentPainter.painter);

  const [current, setCurrent] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [solo, setSolo] = useState([]);
  const [group, setGroup] = useState([]);
  const [others, setOthers] = useState([]);

  function setExhibitions(exhibitions) {
    setSolo([]);
    setGroup([]);
    setOthers([]);
    if (exhibitions) {
      for (let i = 0; i < exhibitions.length; i += 1) {
        if (exhibitions[i].which === "solo") {
          setSolo((old) => [...old, exhibitions[i]]);
        } else if (exhibitions[i].which === "group") {
          setGroup((old) => [...old, exhibitions[i]]);
        } else {
          setOthers((old) => [...old, exhibitions[i]]);
        }
      }
      setLoaded(true);
    }
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateActiveMenu("Exhibitions"));
    if (painterSlug && current) {
      getResource(`/${painterSlug}/exhibitions`, setExhibitions);
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
          title="Exhibitions"
          siteTitle={painter.name}
        />
      )}

      {loaded ? (
        <Exhibitions solo={solo} group={group} others={others} />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Index;
