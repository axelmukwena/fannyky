import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SEO from "../../components/SEO";
import Fanny from "../../components/Painter/Paintings/Fanny";
import Buda from "../../components/Painter/Paintings/Buda";
import { updateActiveMenu } from "../../store/menuSlice/currentMenuSlice";

const Index = function Index() {
  const painter = useSelector((state) => state.currentPainter.painter);
  console.log("painterSlug:", painter);

  const router = useRouter();
  const { painterSlug } = router.query;

  const dispatch = useDispatch();
  if (painter) {
    dispatch(updateActiveMenu("Works"));
    return (
      <>
        <SEO
          description={painter.about}
          title="Works"
          siteTitle={painter.name}
        />
        {painter.rank === 1 && painter.slug === painterSlug && (
          <Buda router={router} />
        )}
        {painter.rank === 2 && painter.slug === painterSlug && (
          <Fanny router={router} />
        )}
      </>
    );
  }
  return null;
};

export default Index;
