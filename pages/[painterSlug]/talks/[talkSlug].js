import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Talks/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import NotFound from "../../404";
import Layout from "../../../components/Layout";
import { apiUrl } from "../../../utilities/helpers";

const Talk = function Talk({ talk, painter }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(updateActiveMenu("Talks"));
  }, []);

  if (router.isFallback) {
    return <Loading />;
  }

  if (!talk) return null;

  if (talk && talk.record === false) {
    return <NotFound message="Could not find talk." />;
  }

  return (
    <>
      <SEO
        description={talk.description}
        title={talk.title}
        siteTitle={`Talks by ${talk.painter.name}`}
      />
      <Layout painter={painter}>
        <Show talk={talk} />
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const allTalks = [];

  const response = await fetch(apiUrl("/"));
  const painters = await response.json();

  painters.forEach(async function foo(painter) {
    const innerResponse = await fetch(apiUrl(`/${painter.slug}/talks`));
    const talks = await innerResponse.json();
    allTalks.concat(talks);
  });

  const paths = allTalks.map((talk) => ({
    params: { painterSlug: talk.painter.slug, talkSlug: talk.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(content) {
  const { painterSlug, talkSlug } = content.params;
  const response = await fetch(apiUrl(`/${painterSlug}/talks/${talkSlug}`));
  const talk = await response.json();

  if (!talk) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      talk,
      painter: talk ? talk.painter : null,
    },
    revalidate: 5,
  };
}

export default Talk;
