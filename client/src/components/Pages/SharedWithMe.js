import { Grid, CssBaseline } from "@mui/material";
import { grey } from "@mui/material/colors";

function SharedWithMe() {
  return (
    <>
      <CssBaseline />
      <Grid container spacing={3} style={{ width: "100%" }} sx={{ mt: 9 }}>
        <Grid
          item
          xs={12}
          md={2}
          style={{ height: "90vh", background: grey[400] }}
        >
          hello
        </Grid>
        <Grid item xs={12} md={8} style={{ paddingTop: "20px" }}></Grid>
      </Grid>
    </>
  );
}

export default SharedWithMe;
