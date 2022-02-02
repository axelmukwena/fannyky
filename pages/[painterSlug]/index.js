import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import SEO from "../../components/SEO";
import Fanny from "../../components/Painter/Paintings/Fanny";
import Buda from "../../components/Painter/Paintings/Buda";

const Index = function Index() {
  const painter = useSelector((state) => state.currentPainter.painter);

  const router = useRouter();
  const { painterSlug } = router.query;

  if (painter) {
    return (
      <>
        <SEO
          description={painter.about}
          title={painter.name}
          siteTitle="Buda Fans"
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
