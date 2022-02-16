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

  if ((painter && painter.record === false) || !painter) {
    return <NotFound message="Could not find artist." />;
  }

  return (
    <>
      {painter && (
        <SEO
          description={painter.about}
          title="Publications"
          siteTitle={painter.name}
          image={String(painter.rank)}
          url={`https://budafans.com${router.asPath}`}
        />
      )}
      <Layout painter={painter}>
        {publications ? (
          <Publications publications={publications} painter={painter} />
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

  const painterRes = await fetch(apiUrl(`/${painterSlug}`));
  const painter = await painterRes.json();

  const publicationsRes = await fetch(apiUrl(`/${painterSlug}/publications`));
  const publications = await publicationsRes.json();

  return {
    props: {
      publications,
      painter,
    },
    revalidate: 5,
  };
}

export default Index;
