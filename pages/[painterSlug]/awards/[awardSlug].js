import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Awards/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";

const Award = function Award() {
  const router = useRouter();
  const { painterSlug, awardSlug } = router.query;

  const [award, setAward] = useState(null);
  const [current, setCurrent] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateActiveMenu("Awards"));
    if (painterSlug && awardSlug && current) {
      getResource(`/${painterSlug}/awards/${awardSlug}`, setAward);
    }

    return () => {
      setCurrent(false);
    };
  }, [painterSlug, awardSlug]);

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

export default Award;
