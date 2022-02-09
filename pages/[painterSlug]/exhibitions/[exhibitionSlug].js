import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Exhibitions/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";

const Exhibition = function Exhibition() {
  const router = useRouter();
  const { painterSlug, exhibitionSlug } = router.query;

  const [exhibition, setExhibition] = useState(null);
  const [current, setCurrent] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateActiveMenu("Exhibitions"));
    if (painterSlug && exhibitionSlug && current) {
      getResource(
        `/${painterSlug}/exhibitions/${exhibitionSlug}`,
        setExhibition
      );
    }

    return () => {
      setCurrent(false);
    };
  }, [painterSlug, exhibitionSlug]);

  if (exhibition) {
    return (
      <>
        <SEO
          description={exhibition.description}
          title={exhibition.title}
          siteTitle={`Exhibitions by ${exhibition.painter.name}`}
        />
        <Show exhibition={exhibition} />
      </>
    );
  }
  return <Loading />;
};

export default Exhibition;
