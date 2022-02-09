import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Paintings/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";

const Work = function Work() {
  const router = useRouter();
  const { painterSlug, workSlug } = router.query;

  const [painting, setPainting] = useState(null);
  const [width, setWidth] = useState(0);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateActiveMenu("Works"));
    if (painterSlug && workSlug) {
      getResource(`/${painterSlug}/paintings/${workSlug}`, setPainting);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [painterSlug, workSlug]);

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

export default Work;
