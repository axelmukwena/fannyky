import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "../../../components/SEO";
import Fanny from "../../../components/Painter/Paintings/Fanny";
import Buda from "../../../components/Painter/Paintings/Buda";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import NotFound from "../../404";
import { apiUrl } from "../../../utilities/helpers";
import Loading from "../../../components/Loading/Loading";
import Layout from "../../../components/Layout";

const Index = function Index({ paintings, painter }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(updateActiveMenu("Works"));
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
        title="Works"
        siteTitle={painter.name}
        image={String(painter.rank)}
        url={`https://budafans.com${router.asPath}`}
      />
      <Layout painter={painter}>
        {painter.rank === 1 && <Buda painter={painter} paintings={paintings} />}
        {painter.rank === 2 && <Fanny paintings={paintings} />}
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

  const paintingsRes = await fetch(apiUrl(`/${painterSlug}/paintings`));
  const paintings = await paintingsRes.json();

  return {
    props: {
      paintings,
      painter,
    },
    revalidate: 5,
  };
}

export default Index;
