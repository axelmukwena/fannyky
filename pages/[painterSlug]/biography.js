import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "../../components/SEO";
import { updateActiveMenu } from "../../store/menuSlice/currentMenuSlice";
import Biography from "../../components/Painter/Biography/Biography";
import NotFound from "../404";
import { apiUrl } from "../../utilities/helpers";
import Loading from "../../components/Loading/Loading";
import Layout from "../../components/Layout";

const Index = function Index({ painter }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(updateActiveMenu("Biography"));
  }, []);

  if (router.isFallback) {
    return <Loading />;
  }

  if ((painter && painter.record === false) || !painter) {
    return <NotFound message="Could not find artist." />;
  }

  return (
    <>
      <SEO
        description={painter.about}
        title="Biography"
        siteTitle={painter.name}
        image={String(painter.rank)}
        url={`https://budafans.com${router.asPath}`}
      />
      <Layout painter={painter}>
        <Biography painter={painter} />
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const response = await fetch(apiUrl("/"));
  const painters = await response.json();

  const paths = painters.map((painter) => ({
    params: {
      painterSlug: painter.slug,
    },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(content) {
  const { painterSlug } = content.params;
  const response = await fetch(apiUrl(`/${painterSlug}`));
  const painter = await response.json();

  return {
    props: {
      painter,
    },
    revalidate: 5,
  };
}

export default Index;
