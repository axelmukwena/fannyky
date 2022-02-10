import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Publications/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";
import NotFound from "../../404";

const Publication = function Publication({ painterSlug, publicationSlug }) {
  const [current, setCurrent] = useState(true);
  const [publication, setPublication] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (current) {
      dispatch(updateActiveMenu("Publications"));
      getResource(
        `/${painterSlug}/publications/${publicationSlug}`,
        setPublication
      );
    }

    return () => {
      setCurrent(false);
    };
  }, []);

  if (publication && publication.record === false) {
    return <NotFound message="Could not find publication." />;
  }

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

export async function getServerSideProps({ params }) {
  const { painterSlug, publicationSlug } = params;
  return {
    props: { painterSlug, publicationSlug },
  };
}

export default Publication;
