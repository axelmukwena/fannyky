import { Box, CircularProgress, Grid } from "@mui/material";

const Loading = function Loading() {
  return (
    <Grid
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ margin: 0, padding: 0, height: "100vh" }}
      container
    >
      <Grid item>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Loading;
