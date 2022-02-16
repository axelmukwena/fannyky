import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Exhibitions from "../../../components/Painter/Exhibitions/Exhibitions";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { apiUrl } from "../../../utilities/helpers";
import NotFound from "../../404";
import Layout from "../../../components/Layout";

const Index = function Index({ exhibitions, painter }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [solo, setSolo] = useState([]);
  const [group, setGroup] = useState([]);
  const [others, setOthers] = useState([]);

  function setExhibitions(exhibits) {
    setSolo([]);
    setGroup([]);
    setOthers([]);
    if (exhibits) {
      for (let i = 0; i < exhibits.length; i += 1) {
        if (exhibits[i].which === "solo") {
          setSolo((old) => [...old, exhibits[i]]);
        } else if (exhibits[i].which === "group") {
          setGroup((old) => [...old, exhibits[i]]);
        } else {
          setOthers((old) => [...old, exhibits[i]]);
        }
      }
      setLoaded(true);
    }
  }

  useEffect(() => {
    if (exhibitions) {
      setExhibitions(exhibitions);
    }
    dispatch(updateActiveMenu("Exhibitions"));
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
          title="Exhibitions"
          siteTitle={painter.name}
          image={String(painter.rank)}
          url={`https://budafans.com${router.asPath}`}
        />
      )}
      <Layout painter={painter}>
        {loaded ? (
          <Exhibitions
            solo={solo}
            group={group}
            others={others}
            painter={painter}
          />
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

  const exhibitionsRes = await fetch(apiUrl(`/${painterSlug}/exhibitions`));
  const exhibitions = await exhibitionsRes.json();

  return {
    props: {
      exhibitions,
      painter,
    },
    revalidate: 5,
  };
}

export default Index;
