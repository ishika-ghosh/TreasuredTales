import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteMemory } from "../../actions/posts";
import {
  LOADING,
  OPEN_POST_MODAL,
  OPEN_SHARE_MODAL,
} from "../../actions/action";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { Divider } from "@mui/material";
function Option() {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.selectedId);
  const currentGroupId = useSelector((state) => state.selectedGroup);
  const handleUpdate = () => {
    dispatch({ type: OPEN_POST_MODAL });
  };
  const handleDelete = () => {
    dispatch({ type: LOADING });
    dispatch(deleteMemory(currentId));
  };
  const handleShare = () => {
    dispatch({ type: OPEN_SHARE_MODAL });
  };
  return (
    <div className="option-div">
      <ul style={{ listStyle: "none" }}>
        <li>
          <button className="button" onClick={handleUpdate}>
            <EditIcon />
            <span style={{ marginRight: "10px", textAlign: "right" }}>
              Edit
            </span>
          </button>
        </li>
        <Divider />
        {!currentGroupId && (
          <>
            <li>
              <button className="button" onClick={handleShare}>
                <ShareIcon /> <span>Share</span>
              </button>
            </li>
            <Divider />
          </>
        )}
        {
          <li>
            <button className="button" onClick={handleDelete}>
              <DeleteIcon />
              {currentGroupId ? <span>Remove</span> : <span>Delete</span>}
            </button>
          </li>
        }
      </ul>
    </div>
  );
}

export default Option;
