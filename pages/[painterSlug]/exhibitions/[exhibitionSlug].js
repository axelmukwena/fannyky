import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Exhibitions/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { apiUrl } from "../../../utilities/helpers";
import NotFound from "../../404";

const Exhibition = function Exhibition({ exhibition }) {
  const [current, setCurrent] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    if (current) {
      dispatch(updateActiveMenu("Exhibitions"));
    }

    return () => {
      setCurrent(false);
    };
  }, []);

  if (exhibition.record === false) {
    return <NotFound message="Could not find exhibition." />;
  }

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

export async function getServerSideProps({ params }) {
  const { painterSlug, exhibitionSlug } = params;
  const response = await fetch(
    apiUrl(`/${painterSlug}/exhibitions/${exhibitionSlug}`)
  );
  const exhibition = await response.json();

  return {
    props: { exhibition },
  };
}

export default Exhibition;
