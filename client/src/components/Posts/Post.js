import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgress } from "@mui/material";
import { SET_SELECTED_POST } from "../../actions/action";
import Option from "./Option";
import "./style.css";

export default function Post({ post }) {
  const { title, selectedFile, _id, message, tags, createdAt, lastEdited } =
    post;
  const dispatch = useDispatch();
  const clickedId = useSelector((state) => state.selectedId);
  const loading = useSelector((state) => state.posts.loading);
  const currentId = useSelector((state) => state.selectedId);
  const handleFunction = (id) => {
    var _id = null;
    if (clickedId) {
      _id = null;
    } else {
      _id = id;
    }
    dispatch({ type: SET_SELECTED_POST, payload: _id });
  };
  return (
    <div className="card">
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
            {lastEdited === null
              ? `• Created ${moment(createdAt).fromNow()}`
              : `• Last Edited ${moment(lastEdited).fromNow()}`}
          </h1>
          <div className="card-body">
            <h1 className="caed-title">{title}</h1>
            <p className="card-message">{message}</p>
            <p className="card-tags">{tags.map((t) => `${t} `)} </p>
            <p className="card-message">
              • Created {moment(createdAt).fromNow()}
            </p>
          </div>
          <button className="info-button" onClick={() => handleFunction(_id)}>
            <MoreVertIcon />
          </button>
          {clickedId === _id && <Option />}
        </>
      )}
    </div>
  );
}
