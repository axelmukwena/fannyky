import SEO from "../components/SEO";
import Home from "../components/Home/Home";
import { apiUrl } from "../utilities/helpers";

const Index = function Index({ painters }) {
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

export async function getServerSideProps() {
  const response = await fetch(apiUrl("/"));
  const painters = await response.json();
  return {
    props: { painters },
  };
}

export default Index;
