import { useDispatch } from "react-redux";
import { useEffect } from "react";
import SEO from "../../components/SEO";
import { updateActiveMenu } from "../../store/menuSlice/currentMenuSlice";
import Biography from "../../components/Painter/Biography/Biography";
import { apiUrl } from "../../utilities/helpers";

const Index = function Index({ painter }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateActiveMenu("Biography"));
  }, []);

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

export async function getServerSideProps({ params }) {
  const { painterSlug } = params;
  const response = await fetch(apiUrl(`/${painterSlug}`));
  const painter = await response.json();
  return {
    props: { painter },
  };
}

export default Index;
