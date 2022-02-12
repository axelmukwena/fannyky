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

  if (!painter) return null;

  if (painter && painter.record === false) {
    return <NotFound message="Could not find artist." />;
  }

  return (
    <>
      {painter && (
        <SEO
          description={painter.about}
          title="Awards"
          siteTitle={painter.name}
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
  const response = await fetch(apiUrl(`/${painterSlug}/awards`));
  const awards = await response.json();

  if (!awards) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      awards,
      painter: awards.length > 0 ? awards[0].painter : null,
    },
    revalidate: 5,
  };
}

export default Index;
