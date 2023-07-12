import React from "react";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

function AddButton({ title, handleOpen }) {
  const user = useSelector((state) => state.userAuth.authData);

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        mt: "80px",
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: "100",
        padding: "10px",
        paddingRight: { xs: "0px", md: "20px" },
      }}
      onClick={handleOpen}
      disabled={user === null}
    >
      <AddIcon sx={{ mr: "10px", ml: "0px" }} />
      <Typography variant="h8" sx={{ display: { xs: "none", md: "block" } }}>
        {title}
      </Typography>
    </Button>
  );
}

export default AddButton;
