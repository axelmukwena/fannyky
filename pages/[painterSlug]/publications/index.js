import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Publications from "../../../components/Painter/Publications/Publications";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { apiUrl } from "../../../utilities/helpers";

const Index = function Index({ publications }) {
  const painter = useSelector((state) => state.currentPainter.painter);

  const [current, setCurrent] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    if (current) {
      dispatch(updateActiveMenu("Publications"));
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
          title="Publications"
          siteTitle={painter.name}
        />
      )}
      {publications ? (
        <Publications publications={publications} />
      ) : (
        <Loading />
      )}
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { painterSlug } = params;
  const response = await fetch(apiUrl(`/${painterSlug}/publications`));
  const publications = await response.json();
  return {
    props: { publications },
  };
}

export default Index;
