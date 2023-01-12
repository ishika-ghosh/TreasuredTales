import { useSelector, useDispatch } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { handleFunction } from "./handleFunction";
import Option from "./Option";
import "./style.css";
import { CircularProgress } from "@mui/material";

export default function Post({ post }) {
  const { title, selectedFile, _id, message, tags, createdAt } = post;
  const dispatch = useDispatch();
  const clickedId = useSelector((state) => state.selectedId);
  const loading = useSelector((state) => state.posts.loading);
  const currentId = useSelector((state) => state.selectedId);
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
          <h1 className="time">• Created {moment(createdAt).fromNow()}</h1>
          <div className="card-body">
            <h1 className="caed-title">{title}</h1>
            <p className="card-message">{message}</p>
            <p className="card-tags">{tags.map((t) => `${t} `)} </p>
            <p className="card-message">
              • Created {moment(createdAt).fromNow()}
            </p>
          </div>
          <button
            className="info-button"
            onClick={() => handleFunction(clickedId, dispatch, _id)}
          >
            <MoreVertIcon />
          </button>
          {clickedId === _id && <Option />}
        </>
      )}
    </div>
  );
}
