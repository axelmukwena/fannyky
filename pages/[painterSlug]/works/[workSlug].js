import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Paintings/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { apiUrl } from "../../../utilities/helpers";
import NotFound from "../../404";

const Work = function Work({ painting }) {
  const [width, setWidth] = useState(0);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateActiveMenu("Works"));

    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (painting.record === false) {
    return <NotFound message="Could not find artwork." />;
  }

  if (painting) {
    return (
      <>
        <SEO
          description={painting.description}
          title={painting.title}
          siteTitle={`Works by ${painting.painter.name}`}
        />
        <Show painting={painting} width={width} />
      </>
    );
  }
  return <Loading />;
};

export async function getServerSideProps({ params }) {
  const { painterSlug, workSlug } = params;
  const response = await fetch(apiUrl(`/${painterSlug}/paintings/${workSlug}`));
  const painting = await response.json();
  return {
    props: { painting },
  };
}

export default Work;
