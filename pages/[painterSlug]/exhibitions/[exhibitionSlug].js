import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Exhibitions/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";
import NotFound from "../../404";

const Exhibition = function Exhibition({ painterSlug, exhibitionSlug }) {
  const [current, setCurrent] = useState(true);
  const [exhibition, setExhibition] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (current) {
      dispatch(updateActiveMenu("Exhibitions"));
      getResource(
        `/${painterSlug}/exhibitions/${exhibitionSlug}`,
        setExhibition
      );
    }

    return () => {
      setCurrent(false);
    };
  }, []);

  if (exhibition && exhibition.record === false) {
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
  return {
    props: { painterSlug, exhibitionSlug },
  };
}

export default Exhibition;
