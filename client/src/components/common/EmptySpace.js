import React from "react";
import "./style.css";
import empty from "./empty.png";
function EmptySpace() {
  return (
    <div class="med-card">
      <div class="circle">
        <img src={empty} alt="logo" className="empty-logo" />
        <h3 className="header">TreasuredTales</h3>
        <p className="para">
          Every memory we create together is a footprint on the path of a life
          we make together.Make some of them and spread Love.
        </p>
      </div>
    </div>
  );
}

export default EmptySpace;
