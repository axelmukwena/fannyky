import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Paintings/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";
import NotFound from "../../404";

const Work = function Work({ painterSlug, workSlug }) {
  const [width, setWidth] = useState(0);
  const [painting, setPainting] = useState(null);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateActiveMenu("Works"));
    getResource(`/${painterSlug}/paintings/${workSlug}`, setPainting);

    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [painterSlug]);

  if (painting && painting.record === false) {
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
  return {
    props: { painterSlug, workSlug },
  };
}

export default Work;
