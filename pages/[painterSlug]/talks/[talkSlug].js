import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Talks/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { apiUrl } from "../../../utilities/helpers";
import NotFound from "../../404";

const Talk = function Talk({ talk }) {
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

  if (talk.record === false) {
    return <NotFound message="Could not find talk." />;
  }

  if (talk) {
    return (
      <>
        <SEO
          description={talk.description}
          title={talk.title}
          siteTitle={`Talks by ${talk.painter.name}`}
        />
        <Show talk={talk} />
      </>
    );
  }
  return <Loading />;
};

export async function getServerSideProps({ params }) {
  const { painterSlug, talkSlug } = params;
  const response = await fetch(apiUrl(`/${painterSlug}/talks/${talkSlug}`));
  const talk = await response.json();
  return {
    props: { talk },
  };
}

export default Talk;
