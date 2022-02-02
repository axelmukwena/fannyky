import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Show from "../../../components/Painter/Paintings/Show";
import SEO from "../../../components/SEO";
import { getResource } from "../../../utilities/requests";

const Work = function Work() {
  const router = useRouter();
  const { painterSlug, workSlug } = router.query;

  const [painting, setPainting] = useState(null);
  const [width, setWidth] = useState(0);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
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
          siteTitle="Buda Fans"
        />
        <Show painting={painting} width={width} />
      </>
    );
  }
  return null;
};

export default Work;
