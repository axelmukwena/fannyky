import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SEO from "../../components/SEO";
import Fanny from "../../components/Painter/Paintings/Fanny";
import Buda from "../../components/Painter/Paintings/Buda";
import { updateActiveMenu } from "../../store/menuSlice/currentMenuSlice";
import { parsePath } from "../../utilities/helpers";
// import { getResource } from "../../utilities/requests";

const Index = function Index() {
  const painter = useSelector((state) => state.currentPainter.painter);

  const router = useRouter();
  const pathItems = parsePath(router.asPath);

  const dispatch = useDispatch();
  if (painter && pathItems) {
    console.log("painter", painter);
    console.log("pathItems", pathItems);
    dispatch(updateActiveMenu("Works"));
    return (
      <>
        <SEO
          description={painter.about}
          title="Works"
          siteTitle={painter.name}
        />
        {painter.rank === 1 && painter.slug === pathItems[0] && (
          <Buda router={router} />
        )}
        {painter.rank === 2 && painter.slug === pathItems[0] && (
          <Fanny router={router} painterSlug={pathItems[0]} />
        )}
      </>
    );
  }
  return null;
};

/* export const getStaticPaths = async () => {
  let paths = [];
  function setPainters(painters) {
    if (painters) {
      paths = painters.map((painter) => ({
        params: { painterSlug: painter.slug },
      }));
    }
  }

  getResource("/", setPainters).then(function foo() {
    return { paths, fallback: false };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  let paintings = [];
  function setPaintings(data) {
    if (data) {
      paintings = data;
    }
  }

  const painterSlug = context.params?.painterSlug || "";
  getResource(`/${painterSlug}/paintings`, setPaintings).then(function foo() {
    console.log("getStaticProps", paintings)
    return { paintings };
  });
  return { paintings };
}; */

export default Index;
