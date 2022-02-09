import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import Show from "../../../components/Painter/Talks/Show";
import SEO from "../../../components/SEO";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../../utilities/requests";

const Talk = function Talk() {
  const router = useRouter();
  const { painterSlug, talkSlug } = router.query;

  const [talk, setTalk] = useState(null);
  const [current, setCurrent] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateActiveMenu("Talks"));
    if (painterSlug && talkSlug && current) {
      getResource(`/${painterSlug}/talks/${talkSlug}`, setTalk);
    }

    return () => {
      setCurrent(false);
    };
  }, [painterSlug, talkSlug]);

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

export default Talk;
