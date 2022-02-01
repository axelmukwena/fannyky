import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  parsePainterMenu,
  updateMenuSlice,
} from "../../store/menuSlice/updateMenu";
import { updatePainter } from "../../store/painterSlice/currentPainterSlice";
import { updateSiteName } from "../../store/menuSlice/currentMenuSlice";
import { getResource } from "../../utilities/requests";
import SEO from "../../components/SEO";
import Paintings from "../../components/Painter/Paintings/Index";
import Layout from "../../components/Layout";

const Index = function Index() {
  const dispatch = useDispatch();
  const [painterObject, setPainterObject] = useState({});

  const router = useRouter();
  const { painterSlug } = router.query;

  const setPainter = function setPainter(painter) {
    if (painter) {
      setPainterObject(painter);
      const menu = parsePainterMenu(painter, `/${painter.slug}`);
      updateMenuSlice(dispatch, menu);
      dispatch(updatePainter(painter));
      dispatch(updateSiteName([painter.name, `/${painter.slug}`]));
    }
  };

  useEffect(() => {
    if (painterSlug) {
      getResource(`/${painterSlug}`, setPainter);
    }
  }, [painterSlug, dispatch]);

  return (
    <>
      <SEO
        description={painterObject.about}
        title={painterObject.name}
        siteTitle="Buda Fans"
      />
      <Layout>
        <Paintings />
      </Layout>
    </>
  );
};

export default Index;
