import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SEO from "../../components/SEO";
import Fanny from "../../components/Painter/Paintings/Fanny";
import Buda from "../../components/Painter/Paintings/Buda";
import { updateActiveMenu } from "../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../utilities/requests";
import NotFound from "../404";

const Index = function Index({ painterSlug }) {
  const dispatch = useDispatch();

  const [painter, setPainter] = useState(null);

  useEffect(() => {
    dispatch(updateActiveMenu("Works"));
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

export async function getServerSideProps({ params }) {
  const { painterSlug } = params;
  return {
    props: { painterSlug },
  };
}

export default Index;
