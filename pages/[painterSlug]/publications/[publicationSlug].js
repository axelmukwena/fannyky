import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Publications/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { apiUrl } from "../../../utilities/helpers";
import NotFound from "../../404";

const Publication = function Publication({ publication }) {
  const [current, setCurrent] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    if (current) {
      dispatch(updateActiveMenu("Publications"));
    }

    return () => {
      setCurrent(false);
    };
  }, []);

  if (publication.record === false) {
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
  const response = await fetch(
    apiUrl(`/${painterSlug}/publications/${publicationSlug}`)
  );
  const publication = await response.json();
  return {
    props: { publication },
  };
}

export default Publication;
