import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Publications from "../../../components/Painter/Publications/Publications";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { apiUrl } from "../../../utilities/helpers";
import NotFound from "../../404";
import Layout from "../../../components/Layout";

const Index = function Index({ publications, painter }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(updateActiveMenu("Publications"));
  }, []);

  if (router.isFallback) {
    return <Loading />;
  }

  if (!painter) return null;

  if (painter && painter.record === false) {
    return <NotFound message="Could not find artist." />;
  }

  return (
    <>
      {painter && (
        <SEO
          description={painter.about}
          title="Publications"
          siteTitle={painter.name}
        />
      )}
      <Layout painter={painter}>
        {publications ? (
          <Publications publications={publications} />
        ) : (
          <Loading />
        )}
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const response = await fetch(apiUrl("/"));
  const painters = await response.json();

  const paths = painters.map((painter) => ({
    params: { painterSlug: painter.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(content) {
  const { painterSlug } = content.params;
  const response = await fetch(apiUrl(`/${painterSlug}/publications`));
  const publications = await response.json();

  if (!publications) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      publications,
      painter: publications.length > 0 ? publications[0].painter : null,
    },
    revalidate: 5,
  };
}

export default Index;
