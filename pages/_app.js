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
import { parsePath } from "../utilities/helpers";

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
  const pathItems = parsePath(router.asPath);

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
    authorizeUser(dispatch);
    if (pathItems[0] && pathItems[0] !== "[painterSlug]") {
      console.log("PathItem:", pathItems[0]);
      getResource(`/${pathItems[0]}`, parsePainter);
    }
  }, [pathItems]);

  if (ready && router.pathname !== "/") {
    return <Layout>{children}</Layout>;
  }

  return children;
};

export default App;
