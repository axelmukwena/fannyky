import { useRouter } from "next/router";
import SEO from "../components/SEO";
import Home from "../components/Home/Home";
import NotFound from "./404";
import { apiUrl } from "../utilities/helpers";
import Loading from "../components/Loading/Loading";

const Index = function Index({ painters }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  if ((painters && painters.record === false) || !painters) {
    return (
      <NotFound
        title="500"
        message="Server down! Please alert the administrator."
        down
      />
    );
  }

  return (
    <>
      <SEO
        description="Contemporary and abstract paintings by Fanny and Ky"
        title="Home"
        siteTitle="Buda Fans"
        image="https://budafans.com/static/assets/backgrounds/300-buda.png"
        url="https://budafans.com/"
      />
      <Home paintersData={painters} />
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch(apiUrl("/"));
  const painters = await response.json();

  return {
    props: {
      painters,
    },
    revalidate: 5,
  };
}

export default Index;
