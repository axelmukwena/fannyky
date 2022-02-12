import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Exhibitions/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import NotFound from "../../404";
import Layout from "../../../components/Layout";
import { apiUrl } from "../../../utilities/helpers";

const Exhibition = function Exhibition({ exhibition, painter }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(updateActiveMenu("Exhibitions"));
  }, []);

  if (router.isFallback) {
    return <Loading />;
  }

  if (!exhibition) return null;

  if (exhibition && exhibition.record === false) {
    return <NotFound message="Could not find exhibition." />;
  }

  return (
    <>
      <SEO
        description={exhibition.description}
        title={exhibition.title}
        siteTitle={`Exhibitions by ${exhibition.painter.name}`}
      />
      <Layout painter={painter}>
        <Show exhibition={exhibition} />
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const allExhibitions = [];

  const response = await fetch(apiUrl("/"));
  const painters = await response.json();

  painters.forEach(async function foo(painter) {
    const innerResponse = await fetch(apiUrl(`/${painter.slug}/exhibitions`));
    const exhibitions = await innerResponse.json();
    allExhibitions.concat(exhibitions);
  });

  const paths = allExhibitions.map((exhibition) => ({
    params: {
      painterSlug: exhibition.painter.slug,
      exhibitionSlug: exhibition.slug,
    },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(content) {
  const { painterSlug, exhibitionSlug } = content.params;
  const response = await fetch(
    apiUrl(`/${painterSlug}/exhibitions/${exhibitionSlug}`)
  );
  const exhibition = await response.json();

  if (!exhibition) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      exhibition,
      painter: exhibition ? exhibition.painter : null,
    },
    revalidate: 5,
  };
}

export default Exhibition;
