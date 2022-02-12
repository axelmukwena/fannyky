import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Awards/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import NotFound from "../../404";
import Layout from "../../../components/Layout";
import { apiUrl } from "../../../utilities/helpers";

const Award = function Award({ award, painter }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(updateActiveMenu("Awards"));
  }, []);

  if (router.isFallback) {
    return <Loading />;
  }

  if (!award) return null;

  if (award && award.record === false) {
    return <NotFound message="Could not find award." />;
  }

  return (
    <>
      <SEO
        description={award.description}
        title={award.title}
        siteTitle={`Awards by ${award.painter.name}`}
      />
      <Layout painter={painter}>
        <Show award={award} />
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const allAwards = [];

  const response = await fetch(apiUrl("/"));
  const painters = await response.json();

  painters.forEach(async function foo(painter) {
    const innerResponse = await fetch(apiUrl(`/${painter.slug}/awards`));
    const awards = await innerResponse.json();
    allAwards.concat(awards);
  });

  const paths = allAwards.map((award) => ({
    params: {
      painterSlug: award.painter.slug,
      awardSlug: award.slug,
    },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(content) {
  const { painterSlug, awardSlug } = content.params;
  const response = await fetch(apiUrl(`/${painterSlug}/awards/${awardSlug}`));
  const award = await response.json();

  if (!award) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      award,
      painter: award ? award.painter : null,
    },
    revalidate: 5,
  };
}

export default Award;
