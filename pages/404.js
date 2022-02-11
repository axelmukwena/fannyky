import { Grid } from "@mui/material";

const NotFound = function NotFound({ title, message }) {
  return (
    <Grid
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ margin: 0, padding: 0, height: "80vh" }}
      container
    >
      <Grid item>
        <h1 className="page-error-title">{title || "404"}</h1>
        <div className="page-error-content-container">
          <h2 className="page-error-text">
            {message || "This page could not be found."}
          </h2>
        </div>
      </Grid>
    </Grid>
  );
};
export default NotFound;
