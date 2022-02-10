import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Awards/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";
import NotFound from "../../404";

const Award = function Award({ painterSlug, awardSlug }) {
  const [current, setCurrent] = useState(true);
  const [award, setAward] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (current) {
      dispatch(updateActiveMenu("Awards"));
      getResource(`/${painterSlug}/awards/${awardSlug}`, setAward);
    }

    return () => {
      setCurrent(false);
    };
  }, []);

  if (award && award.record === false) {
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
  return {
    props: { painterSlug, awardSlug },
  };
}

export default Award;
