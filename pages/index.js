import { useEffect, useState } from "react";
import SEO from "../components/SEO";
import Home from "../components/Home/Home";
import { getResource } from "../utilities/requests";

const Index = function Index() {
  const [painters, setPainters] = useState(null);
  const [current, setCurrent] = useState(true);

  useEffect(() => {
    if (current) {
      getResource("/", setPainters);
    }
    return () => {
      setCurrent(false);
    };
  }, [current]);

  return (
    <>
      <SEO
        description="Contemporary and abstract paintings by Fanny and Ky"
        title="Home"
        siteTitle="Buda Fans"
      />
      <Home paintersData={painters} />
    </>
  );
};

/* export async function getServerSideProps() {
  const response = await fetch(apiUrl("/"));
  const painters = await response.json();
  return {
    props: { painters },
  };
} */

export default Index;
