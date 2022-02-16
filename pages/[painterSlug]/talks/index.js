import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../../components/Layout";
import Loading from "../../../components/Loading/Loading";
import Talks from "../../../components/Painter/Talks/Talks";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { apiUrl } from "../../../utilities/helpers";
import NotFound from "../../404";

const Index = function Index({ talks, painter }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(updateActiveMenu("Talks"));
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
          title="Talks"
          siteTitle={painter.name}
          image={String(painter.rank)}
          url={`https://budafans.com${router.asPath}`}
        />
      )}
      <Layout painter={painter}>
        {talks ? <Talks talks={talks} painter={painter} /> : <Loading />}
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

  const talksRes = await fetch(apiUrl(`/${painterSlug}/talks`));
  const talks = await talksRes.json();

  return {
    props: {
      talks,
      painter,
    },
    revalidate: 5,
  };
}

export default Index;
