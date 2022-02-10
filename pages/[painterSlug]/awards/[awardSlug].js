import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Awards/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { apiUrl } from "../../../utilities/helpers";
import NotFound from "../../404";

const Award = function Award({ award }) {
  const [current, setCurrent] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    if (current) {
      dispatch(updateActiveMenu("Awards"));
    }

    return () => {
      setCurrent(false);
    };
  }, []);

  if (award.record === false) {
    return <NotFound message="Could not find award." />;
  }

  if (award) {
    return (
      <>
        <SEO
          description={award.description}
          title={award.title}
          siteTitle={`Awards by ${award.painter.name}`}
        />
        <Show award={award} />
      </>
    );
  }
  return <Loading />;
};

export async function getServerSideProps({ params }) {
  const { painterSlug, awardSlug } = params;
  const response = await fetch(apiUrl(`/${painterSlug}/awards/${awardSlug}`));
  const award = await response.json();
  return {
    props: { award },
  };
}

export default Award;
