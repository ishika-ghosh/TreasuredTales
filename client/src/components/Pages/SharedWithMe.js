import { Grid, CssBaseline, Divider } from "@mui/material";
import Options from "./../Share/Options";
import { useSelector } from "react-redux";

function SharedWithMe() {
  const user = useSelector((state) => state.userAuth.authData);
  return (
    <>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={2}
          style={{ paddingLeft: "30px", maxHeight: "100vh" }}
        >
          <Options />
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item xs={12} md={8} style={{ paddingTop: "20px" }}></Grid>
      </Grid>
    </>
  );
}

export default SharedWithMe;