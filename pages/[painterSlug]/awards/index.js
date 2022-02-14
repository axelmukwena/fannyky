import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Awards from "../../../components/Painter/Awards/Awards";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { apiUrl } from "../../../utilities/helpers";
import NotFound from "../../404";
import Layout from "../../../components/Layout";

const Index = function Index({ awards, painter }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateActiveMenu("Awards"));
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
          title="Awards"
          siteTitle={painter.name}
          image={String(painter.rank)}
          url={`https://budafans.com${router.asPath}`}
        />
      )}
      <Layout painter={painter}>
        {awards ? <Awards awards={awards} router={router} /> : <Loading />}
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

  const awardsRes = await fetch(apiUrl(`/${painterSlug}/awards`));
  const awards = await awardsRes.json();

  return {
    props: {
      awards,
      painter,
    },
    revalidate: 5,
  };
}

export default Index;
