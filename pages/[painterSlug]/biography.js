import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SEO from "../../components/SEO";
import { updateActiveMenu } from "../../store/menuSlice/currentMenuSlice";
import Biography from "../../components/Painter/Biography/Biography";
import NotFound from "../404";
import { getResource } from "../../utilities/requests";
import { apiUrl } from "../../utilities/helpers";

const Index = function Index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { painterSlug } = router.query;

  const [painter, setPainter] = useState(null);

  useEffect(() => {
    dispatch(updateActiveMenu("Biography"));

    if (painterSlug) {
      getResource(`/${painterSlug}`, setPainter);
    }
  }, [painterSlug]);

  if (painter && painter.record === false) {
    return <NotFound message="Could not find artist." />;
  }

  if (painter) {
    return (
      <>
        <SEO
          description={painter.about}
          title="Biography"
          siteTitle={painter.name}
        />
        <Biography painter={painter} />
      </>
    );
  }
  return null;
};

/* export async function getServerSideProps({ params }) {
  const { painterSlug } = params;
  return {
    props: { painterSlug },
  };
} */

export async function getStaticPaths() {
  const response = await fetch(apiUrl("/"));
  const painters = await response.json();

  const paths = painters.map((painter) => ({
    params: { contact: `${painter.slug}/biography`, painterSlug: painter.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(content) {
  const { painterSlug } = content.params;
  // fetch list of posts
  const response = await fetch(apiUrl(`/${painterSlug}`));
  const painter = await response.json();
  return {
    props: {
      painter,
    },
  };
}

export default Index;
