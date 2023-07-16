import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { CircularProgress, Typography } from "@mui/material";
import { SELECT_POST_DETAILS, SET_SELECTED_POST } from "../../actions/action";
import { LikeGroupPost, handleSharedPost } from "../../actions/posts";
import Option from "./Option";
import "./style.css";

export default function Post({
  post,
  loading,
  hasAccess,
  sharedPost,
  groupPost,
  userId,
}) {
  const {
    creator,
    title,
    selectedFile,
    _id,
    message,
    tags,
    createdAt,
    editDetails,
    isFavourite,
    editor,
    likedBy,
    groups,
  } = post;
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.selectedId);
  const currentGroupId = useSelector((state) => state.selectedGroup);
  const handleFunction = (id) => {
    var _id = null;
    if (currentId) {
      _id = null;
    } else {
      _id = id;
    }
    dispatch({ type: SET_SELECTED_POST, payload: _id });
  };
  const handleFavourite = (id) => {
    dispatch(handleSharedPost(id));
  };
  const handleLike = (id) => {
    // console.log(id);
    dispatch(LikeGroupPost(id, currentGroupId));
  };
  return (
    <div
      className="post-card"
      onDoubleClick={() => {
        // console.log(post);
        dispatch({ type: SELECT_POST_DETAILS, payload: post });
      }}
    >
      {loading && _id === currentId ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : (
        <>
          <img
            className="card-image"
            src={`${selectedFile}`}
            srcSet={`${selectedFile}`}
            alt={title}
            loading="lazy"
            draggable={false}
          />
          <h1 className="time">
            {editDetails.editedAt === null
              ? `• Created ${moment(createdAt).fromNow()}`
              : `• Last Edited ${moment(editDetails.editedAt).fromNow()}`}
          </h1>

          {sharedPost && (
            <div className="fav-div" onClick={() => handleFavourite(_id)}>
              {isFavourite ? (
                <FavoriteIcon className="icon favourite" />
              ) : (
                <FavoriteBorderIcon className="icon " />
              )}
            </div>
          )}
          {groupPost && (
            <div className="fav-div like-div" onClick={() => handleLike(_id)}>
              {likedBy.includes(userId) ? (
                <ThumbUpAltIcon className="icon liked" />
              ) : (
                <ThumbUpOffAltIcon className="icon " />
              )}
              {likedBy.length > 0 && (
                <Typography sx={{ ml: 2 }}>{likedBy.length}</Typography>
              )}
            </div>
          )}

          <div className="card-body prevent-select">
            <h1 className="card-title">{title}</h1>
            <p className="card-message">{message}</p>
            <p className="card-tags">{tags.map((t) => `${t} `)} </p>
            <p className="card-message">
              {editDetails.editedAt === null
                ? `• Created by ${creator.name}`
                : `• Last Edited ${editDetails.editedBy?.name}`}
            </p>
          </div>
          {hasAccess && (
            <button className="info-button" onClick={() => handleFunction(_id)}>
              <MoreVertIcon />
            </button>
          )}
          {currentId === _id && hasAccess && (
            <Option
              sharedPost={sharedPost}
              editor={editor}
              groupPost={groupPost}
              hasAccess={hasAccess}
              isCreator={creator._id === userId}
              groups={groups}
            />
          )}
        </>
      )}
    </div>
  );
}
