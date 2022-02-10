import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Talks/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";
import NotFound from "../../404";

const Talk = function Talk({ painterSlug, talkSlug }) {
  const [current, setCurrent] = useState(true);
  const [talk, setTalk] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (current) {
      dispatch(updateActiveMenu("Talks"));
      getResource(`/${painterSlug}/talks/${talkSlug}`, setTalk);
    }

    return () => {
      setCurrent(false);
    };
  }, []);

  if (talk && talk.record === false) {
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
  return {
    props: { painterSlug, talkSlug },
  };
}

export default Talk;
