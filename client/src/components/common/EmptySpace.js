import React from "react";
import "./style.css";
import empty from "./empty.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
function EmptySpace({ signup }) {
  return (
    <div className="med-card">
      <div className="circle">
        <img src={empty} alt="logo" className="empty-logo" />
        <h3 className="header">TreasuredTales</h3>
        <p className="para">
          Every memory we create together is a footprint on the path of a life
          we make together.Make some of them and spread Love.
        </p>
        {signup && (
          <Button variant="outlined" sx={{ mt: 1 }}>
            <Link
              to={"/auth"}
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Sign Up
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default EmptySpace;
