import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Publications/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import NotFound from "../../404";
import Layout from "../../../components/Layout";
import { apiUrl } from "../../../utilities/helpers";

const Publication = function Publication({ publication, painter }) {
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

  if ((publication && publication.record === false) || !publication) {
    return (
      <NotFound
        painter={painter}
        homeLink
        message="Could not find publication."
      />
    );
  }

  return (
    <>
      <SEO
        description={publication.description}
        title={publication.title}
        siteTitle={`Publications by ${publication.painter.name}`}
      />
      <Layout painter={painter}>
        <Show publication={publication} />
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const allPublications = [];

  const response = await fetch(apiUrl("/"));
  const painters = await response.json();

  painters.forEach(async function foo(painter) {
    const innerResponse = await fetch(apiUrl(`/${painter.slug}/publications`));
    const publications = await innerResponse.json();
    allPublications.concat(publications);
  });

  const paths = allPublications.map((publication) => ({
    params: {
      painterSlug: publication.painter.slug,
      publicationlug: publication.slug,
    },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(content) {
  const { painterSlug, publicationlug } = content.params;

  const painterRes = await fetch(apiUrl(`/${painterSlug}`));
  const painter = await painterRes.json();

  const publicationRes = await fetch(
    apiUrl(`/${painterSlug}/publications/${publicationlug}`)
  );
  const publication = await publicationRes.json();

  return {
    props: {
      publication,
      painter,
    },
    revalidate: 5,
  };
}

export default Publication;
