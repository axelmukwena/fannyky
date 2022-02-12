import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import theme from "../theme";
import * as serviceWorker from "../utilities/serviceWorker";
import reportWebVitals from "../utilities/reportWebVitals";
import store from "../store/store";
import "../styles/globals.css";
import "../styles/menu.css";
import "../styles/painter.css";
import "../styles/toast.css";
import "../styles/errors.css";

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
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
            <div id="toasts-root" />
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
  return null;
};

/* const Painter = function Painter({ children }) {
  const dispatch = useDispatch();
  const [notFound, setNotFound] = useState(false);

  const router = useRouter();
  const pathItems = parsePath(router.asPath);

  const parsePainter = function parsePainter(painter) {
    if (painter && !painter.record) {
      const menu = parsePainterMenu(painter, `/${painter.slug}`);
      updateMenuSlice(dispatch, menu);
      dispatch(updatePainter(painter));
      dispatch(updateSiteName([painter.name, `/${painter.slug}`]));
    } else {
      dispatch(updateActiveMenu(null));
      setNotFound(true);
    }
  };

  useEffect(() => {
    authorizeUser(dispatch);
    if (pathItems) {
      getResource(`/${pathItems[0]}`, parsePainter);
    }
  }, [pathItems]);

  if (notFound) {
    return <NotFound message="Could not find artist." />;
  }
  const paths = ["/", "/404", "/login"];

  if (!paths.includes(router.pathname)) {
    return children;
  }

  return children;
}; */

export default App;
