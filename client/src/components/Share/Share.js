import React from "react";
import { useSelector } from "react-redux";

function Share() {
  const share = useSelector((state) => state.shareModal);
  return share && <div>Share</div>;
}

export default Share;
