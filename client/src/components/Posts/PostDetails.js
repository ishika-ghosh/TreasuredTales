import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import { CLOSE_POST_DETAILS } from "./../../actions/action";
import picture from "./picture.png";
import { removeAccess } from "../../actions/posts";

function PostDetails({ open, details }) {
  const editors = details?.editor.filter(
    (user) => user._id !== details.creator._id
  );
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);
  const [change, setChange] = useState(false);
  const handleClose = () => {
    dispatch({ type: CLOSE_POST_DETAILS });
    if (change) {
      window.location.reload(false);
      setChange(false);
    }
  };
  const handleDelete = (id, op) => {
    dispatch(removeAccess(op, details._id, id));
    setChange(true);
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
            <span className="header-title">{details?.title}</span>
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
                  <button onClick={() => zoomIn()} className="back-btn right">
                    <AddIcon />
                  </button>

                  <button onClick={() => zoomOut()} className="back-btn right">
                    <RemoveIcon />
                  </button>

                  <button
                    onClick={() => resetTransform()}
                    className="back-btn right"
                  >
                    <ZoomOutIcon />
                  </button>
                </div>
                <TransformComponent>
                  <img
                    src={`${details?.selectedFile}`}
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
            <div className="info-card">
              <div className="detail-div first">
                <span>Details</span>
                <button
                  className="back-btn right"
                  onClick={() => setShowDetails(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <hr className="divider" />
              <div className="detail-div">
                <div className="single-info">
                  <div className="main-heading">Title</div>
                  <div className="heading-content">{details?.title}</div>
                </div>
                <div className="single-info">
                  <div className="main-heading">Message</div>
                  <div className="heading-content">{details?.message}</div>
                </div>
                <div className="single-info">
                  <div className="main-heading">Created At</div>
                  <div className="heading-content">
                    {new Date(details?.createdAt).toLocaleTimeString()}
                  </div>
                </div>
                <div className="single-info">
                  <div className="main-heading">Created By</div>
                  <div className="heading-content">{details?.creator.name}</div>
                </div>
                {details?.editDetails.editedAt && (
                  <>
                    <div className="single-info">
                      <div className="main-heading">Last Edited</div>
                      <div className="heading-content">
                        {new Date(
                          details?.editDetails.editedAt
                        ).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="single-info">
                      <div className="main-heading">Edited By</div>
                      <div className="heading-content">
                        {details?.editDetails?.editedBy.name}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <hr className="divider" />
              <div className="detail-div first">
                <span>Shared With</span>
                <ShareIcon />
              </div>
              <div className="detail-div">
                {editors.length > 0 && (
                  <div className="single-info">
                    <div className="main-heading access">Editors</div>
                    {
                      <div className="heading-content access">
                        {editors?.map((user) => (
                          <Chip
                            key={user._id}
                            label={user.email}
                            onDelete={() => handleDelete(user._id, 1)}
                            sx={{ color: "white" }}
                          />
                        ))}
                      </div>
                    }
                  </div>
                )}
                {details.viewer.length > 0 && (
                  <div className="single-info">
                    <div className="main-heading access">Viewers</div>
                    {
                      <div className="heading-content access">
                        {details.viewer.map((user) => (
                          <Chip
                            key={user._id}
                            label={user.email}
                            onDelete={() => handleDelete(user._id, 2)}
                            sx={{ color: "white" }}
                          />
                        ))}
                      </div>
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
