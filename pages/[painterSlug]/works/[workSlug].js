import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Paintings/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { apiUrl } from "../../../utilities/helpers";
import NotFound from "../../404";
import Layout from "../../../components/Layout";

const Work = function Work({ painting, painter }) {
  const router = useRouter();

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

  if (router.isFallback) {
    return <Loading />;
  }

  if ((painter && painter.record === false) || !painter) {
    return <NotFound message="Could not find artist." />;
  }

  if ((painting && painting.record === false) || !painting) {
    return (
      <NotFound painter={painter} homeLink message="Could not find work." />
    );
  }

  return (
    <>
      <SEO
        description={painting.description}
        title={painting.title}
        siteTitle={`Works by ${painting.painter.name}`}
      />
      <Layout painter={painter}>
        <Show painting={painting} width={width} />
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const allPaintings = [];

  const response = await fetch(apiUrl("/"));
  const painters = await response.json();

  painters.forEach(async function foo(painter) {
    const innerResponse = await fetch(apiUrl(`/${painter.slug}/paintings`));
    const paintings = await innerResponse.json();
    allPaintings.concat(paintings);
  });

  const paths = allPaintings.map((painting) => ({
    params: { painterSlug: painting.painter.slug, workSlug: painting.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(content) {
  const { painterSlug, workSlug } = content.params;

  const painterRes = await fetch(apiUrl(`/${painterSlug}`));
  const painter = await painterRes.json();

  const paintingRes = await fetch(
    apiUrl(`/${painterSlug}/paintings/${workSlug}`)
  );
  const painting = await paintingRes.json();

  return {
    props: {
      painting,
      painter,
    },
    revalidate: 5,
  };
}

export default Work;
