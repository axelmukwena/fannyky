import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
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
  const { pathname } = useLocation();

  function setPainter(painter) {
    if (painter) {
      const menu = parsePainterMenu(painter, pathname);
      updateMenuSlice(dispatch, menu);
      dispatch(updatePainter(painter));
      dispatch(updateSiteName([painter.name, `/${painter.slug}`]));
    }
  }

  useEffect(() => {
    getResource(pathname, setPainter);
  }, [pathname, dispatch]);

  return (
    <>
      <SEO
        description="Contemporary and abstract paintings by Fanny and Ky"
        title="Home"
        siteTitle="Buda Fans"
      />
      <Layout>
        <Paintings />
      </Layout>
    </>
  );
};

export default Index;
