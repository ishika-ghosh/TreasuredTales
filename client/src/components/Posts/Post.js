import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { CircularProgress } from "@mui/material";
import { SET_SELECTED_POST } from "../../actions/action";
import { handleSharedPost } from "../../actions/posts";
import Option from "./Option";
import "./style.css";

export default function Post({ post, loading, hasAccess, sharedPost }) {
  const {
    title,
    selectedFile,
    _id,
    message,
    tags,
    createdAt,
    editDetails,
    isFavourite,
    editor,
  } = post;
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.selectedId);
  const handleFunction = (id) => {
    var _id = null;
    if (currentId) {
      _id = null;
    } else {
      _id = id;
    }
    dispatch({ type: SET_SELECTED_POST, payload: _id });
  };
  const handleLike = (id) => {
    dispatch(handleSharedPost(id));
  };
  return (
    <div className="post-card">
      {loading && _id === currentId ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : (
        <>
          <img
            className="card-image"
            src={selectedFile}
            srcSet={selectedFile}
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
            <div className="fav-div" onClick={() => handleLike(_id)}>
              {isFavourite ? (
                <FavoriteIcon className="icon liked" />
              ) : (
                <FavoriteBorderIcon className="icon " />
              )}
            </div>
          )}

          <div className="card-body">
            <h1 className="caed-title">{title}</h1>
            <p className="card-message">{message}</p>
            <p className="card-tags">{tags.map((t) => `${t} `)} </p>
            <p className="card-message">
              • Created {moment(createdAt).fromNow()}
            </p>
          </div>
          {hasAccess && (
            <button className="info-button" onClick={() => handleFunction(_id)}>
              <MoreVertIcon />
            </button>
          )}
          {currentId === _id && hasAccess && (
            <Option sharedPost={sharedPost} editor={editor} />
          )}
        </>
      )}
    </div>
  );
}
