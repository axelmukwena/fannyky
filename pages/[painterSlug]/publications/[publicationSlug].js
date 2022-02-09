import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Publications/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";

const Publication = function Publication() {
  const router = useRouter();
  const { painterSlug, publicationSlug } = router.query;

  const [publication, setPublication] = useState(null);
  const [current, setCurrent] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateActiveMenu("Publications"));
    if (painterSlug && publicationSlug && current) {
      getResource(
        `/${painterSlug}/publications/${publicationSlug}`,
        setPublication
      );
    }

    return () => {
      setCurrent(false);
    };
  }, [painterSlug, publicationSlug]);

  if (publication) {
    return (
      <>
        <SEO
          description={publication.description}
          title={publication.title}
          siteTitle={`Publications by ${publication.painter.name}`}
        />
        <Show publication={publication} />
      </>
    );
  }
  return <Loading />;
};

export default Publication;
