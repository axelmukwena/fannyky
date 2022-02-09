import { useDispatch } from "react-redux";
import SEO from "../../components/SEO";
import Fanny from "../../components/Painter/Paintings/Fanny";
import Buda from "../../components/Painter/Paintings/Buda";
import { updateActiveMenu } from "../../store/menuSlice/currentMenuSlice";
import { apiUrl } from "../../utilities/helpers";
// import { getResource } from "../../utilities/requests";

const Index = function Index({ painter }) {
  const dispatch = useDispatch();
  if (painter) {
    dispatch(updateActiveMenu("Works"));
    return (
      <>
        <SEO
          description={painter.about}
          title="Works"
          siteTitle={painter.name}
        />
        {painter.rank === 1 && <Buda painter={painter} />}
        {painter.rank === 2 && <Fanny painter={painter} />}
      </>
    );
  }
  return null;
};

export async function getStaticPaths() {
  const response = await fetch(apiUrl("/"));
  const painters = await response.json();

  const paths = painters.map((painter) => ({
    params: { painterSlug: painter.slug },
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
