import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section
      style={{
        marginTop: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3em",
      }}
    >
      <h1 style={{ fontSize: "10rem", fontWeight: "100" }}>404</h1>
      <p style={{ fontSize: "3rem", fontWeight: "50" }}>OPPS!!</p>
      <p>The page does not exist or Unavailable</p>
      <Button variant="contained" style={{ marginTop: "2em" }}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          Back to home
        </Link>
      </Button>
    </section>
  );
}

export default NotFound;
