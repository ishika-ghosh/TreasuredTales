import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { CLOSE_POST_DETAILS } from "./../../actions/action";
import picture from "./picture.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Divider, Tooltip } from "@mui/material";
function PostDetails({ open }) {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const handleClose = () => {
    dispatch({ type: CLOSE_POST_DETAILS });
  };
  return (
    <div className={open ? "detailed-container" : "detailed-container closed"}>
      <div className="header-div">
        <div className="header-left">
          <button className="back-btn" onClick={handleClose}>
            <ArrowBackIcon className="details-icon" />
          </button>
          <div className="header-title-div">
            <img src={picture} alt="logo" className="header-pic" />
            <span className="header-title">Header</span>
          </div>
        </div>
        <button
          className="back-btn right"
          onClick={() => setShowDetails(!showDetails)}
        >
          <InfoIcon />
        </button>
      </div>
      <div className="lower-div">
        <div className={showDetails ? "image-div info" : "image-div"}>
          <TransformWrapper
            initialScale={1}
            initialPositionX={1}
            initialPositionY={1}
            limitToBounds={true}
            disablePadding={true}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <>
                <div className="tools">
                  <Tooltip title="zoom in" arrow>
                    <button onClick={() => zoomIn()} className="back-btn right">
                      <AddIcon />
                    </button>
                  </Tooltip>
                  <Tooltip title="zoom out" arrow>
                    <button
                      onClick={() => zoomOut()}
                      className="back-btn right"
                    >
                      <RemoveIcon />
                    </button>
                  </Tooltip>
                  <Tooltip title="Reset Zoom" arrow>
                    <button
                      onClick={() => resetTransform()}
                      className="back-btn right"
                    >
                      <ZoomOutIcon />
                    </button>
                  </Tooltip>
                </div>
                <TransformComponent>
                  <img
                    src={require("./Ishika-1.jpg")}
                    alt="post"
                    className="details-image"
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
        {showDetails && (
          <div className="info-div">
            <div className="info-card"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
