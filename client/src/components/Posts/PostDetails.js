import React from "react";
function PostDetails({ open }) {
  return open ? (
    <div className="detailed-container">
      <div>Header</div>
      <div>ImageBox</div>
    </div>
  ) : null;
}

export default PostDetails;
