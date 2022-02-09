import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Provider, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import theme from "../theme";
import * as serviceWorker from "../utilities/serviceWorker";
import reportWebVitals from "../utilities/reportWebVitals";
import store from "../store/store";
import { getResource } from "../utilities/requests";
import {
  parsePainterMenu,
  updateMenuSlice,
} from "../store/menuSlice/updateMenu";
import { updatePainter } from "../store/painterSlice/currentPainterSlice";
import {
  updateActiveMenu,
  updateSiteName,
} from "../store/menuSlice/currentMenuSlice";
import Layout from "../components/Layout";
import authorizeUser from "../store/currentUser/authorize";
import "../styles/globals.css";
import "../styles/menu.css";
import "../styles/painter.css";
import "../styles/toast.css";

const App = function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    reportWebVitals();
    serviceWorker.unregister();
  }, []);

  if (ready) {
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <Painter>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Component {...pageProps} />
            </Painter>
            <div id="toasts-root" />
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
  return null;
};

const Painter = function Painter({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  console.log("Router:", router);
  const { painterSlug } = router.query;

  const [ready, setReady] = useState(false);

  const parsePainter = function parsePainter(painter) {
    if (painter) {
      const menu = parsePainterMenu(painter, `/${painter.slug}`);
      updateMenuSlice(dispatch, menu);
      dispatch(updatePainter(painter));
      dispatch(updateSiteName([painter.name, `/${painter.slug}`]));
      setReady(true);
    } else {
      dispatch(updateActiveMenu(null));
    }
  };

  useEffect(() => {
    console.log("PainterSlugBefore:", painterSlug);
    authorizeUser(dispatch);
    if (painterSlug) {
      console.log("PainterSlugAfter:", painterSlug);
      getResource(`/${painterSlug}`, parsePainter);
    }
  }, [painterSlug]);

  console.log("_app:", ready, router.pathname);
  if (ready && router.pathname !== "/") {
    return <Layout>{children}</Layout>;
  }

  return children;
};

export default App;
