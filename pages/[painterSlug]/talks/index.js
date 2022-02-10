import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Talks from "../../../components/Painter/Talks/Talks";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { apiUrl } from "../../../utilities/helpers";

const Index = function Index({ talks }) {
  const painter = useSelector((state) => state.currentPainter.painter);

  const [current, setCurrent] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    if (current) {
      dispatch(updateActiveMenu("Talks"));
    }

    return () => {
      setCurrent(false);
    };
  }, []);

  return (
    <>
      {painter && (
        <SEO
          description={painter.about}
          title="Talks"
          siteTitle={painter.name}
        />
      )}

      {talks ? <Talks talks={talks} /> : <Loading />}
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { painterSlug } = params;
  const response = await fetch(apiUrl(`/${painterSlug}/talks`));
  const talks = await response.json();
  return {
    props: { talks },
  };
}

export default Index;
