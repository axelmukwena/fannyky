import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "../../../components/SEO";
import Paintings from "../../../components/Painter/Paintings";
import { updateActiveMenu } from "../../../store/menuSlice/currentMenuSlice";
import NotFound from "../../404";
import Layout from "../../../components/Layout";
import { apiUrl } from "../../../utilities/helpers";
import Loading from "../../../components/Loading/Loading";

const Index = function Index({ paintings, painter, currentCategory }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(updateActiveMenu("Works"));
  }, []);

  if (router.isFallback) {
    return <Loading />;
  }

  if ((painter && painter.record === false) || !painter) {
    return <NotFound message="Could not find artist." />;
  }

  return (
    <>
      <SEO
        description={painter.about}
        title="Works"
        siteTitle={painter.name}
        image={String(painter.rank)}
        url={`https://budafans.com${router.asPath}`}
      />
      <Layout painter={painter}>
        <Paintings
          load={false}
          painter={painter}
          paintings={paintings}
          currentCategory={currentCategory}
        />
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const response = await fetch(apiUrl("/"));
  const painters = await response.json();

  const paths = [];

  for (let i = 0; i < painters.length; i += 1) {
    const painter = painters[i];
    const categories = painter.paintings_categories;

    if (categories) {
      for (let j = 0; j < categories.length; j += 1) {
        const category = categories[j];
        const params = {
          params: { painterSlug: painter.slug, categorySlug: category.slug },
        };
        paths.push(params);
      }
    }
  }

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(content) {
  const { painterSlug, categorySlug } = content.params;

  const painterRes = await fetch(apiUrl(`/${painterSlug}`));
  const painter = await painterRes.json();

  const categories = painter.paintings_categories;
  const filtered = categories?.filter((category) => {
    return category.slug === categorySlug;
  });

  const currentCategory = filtered ? filtered[0] : null;

  if (currentCategory) {
    const paintingsRes = await fetch(
      apiUrl(`/${painterSlug}/paintings_category/${categorySlug}`)
    );
    const paintings = await paintingsRes.json();

    return {
      props: {
        paintings,
        painter,
        currentCategory,
      },
      revalidate: 5,
    };
  }

  // Fallback just incase currentCategory is null
  const paintingsRes = await fetch(apiUrl(`/${painterSlug}/paintings`));
  const paintings = await paintingsRes.json();

  return {
    props: {
      paintings,
      painter,
    },
    revalidate: 5,
  };
}

export default Index;
