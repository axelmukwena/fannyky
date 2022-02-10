import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SEO from "../../components/SEO";
import { updateActiveMenu } from "../../store/menuSlice/currentMenuSlice";
import Biography from "../../components/Painter/Biography/Biography";
import NotFound from "../404";
import { getResource } from "../../utilities/requests";

const Index = function Index({ painterSlug }) {
  const dispatch = useDispatch();

  const [painter, setPainter] = useState(null);

  useEffect(() => {
    dispatch(updateActiveMenu("Biography"));
    getResource(`/${painterSlug}`, setPainter);
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

export async function getServerSideProps({ params }) {
  const { painterSlug } = params;
  return {
    props: { painterSlug },
  };
}

export default Index;
