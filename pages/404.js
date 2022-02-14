import { Grid } from "@mui/material";
import Layout from "../components/Layout";
import NextLink from "../components/NextLink";
import SEO from "../components/SEO";

const NotFound = function NotFound({ title, message, homeLink, painter }) {
  return (
    <>
      <SEO
        description={message || "This page could not be found."}
        title="Buda & Fanny"
        siteTitle={title || "404"}
        image="https://budafans.com/favicon.ico"
        url="https://budafans.com/404"
      />

      {painter && (
        <Layout painter={painter}>
          <Contents
            title={title}
            message={message}
            homeLink={homeLink}
            height="50vh"
          />
        </Layout>
      )}

      {!painter && (
        <Contents
          title={title}
          message={message}
          homeLink={homeLink}
          height="100vh"
        />
      )}
    </>
  );
};

const Contents = function Contents({ title, message, homeLink, height }) {
  return (
    <Grid
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ margin: 0, padding: 0, height }}
      container
    >
      <Grid item>
        <h1 className="page-error-title">{title || "404"}</h1>
        <div className="page-error-content-container">
          <h2 className="page-error-text">
            {message || "This page could not be found."}
            {!homeLink && (
              <>
                <span> Go </span>
                <NextLink href="/" as="/" className="not-found-home-link">
                  home
                </NextLink>
                <span>.</span>
              </>
            )}
          </h2>
        </div>
      </Grid>
    </Grid>
  );
};
export default NotFound;
