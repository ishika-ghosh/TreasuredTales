import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL } from "../../actions/action";
import { deleteMemory } from "../../actions/posts";
import { LOADING, OPEN_SHARE_MODAL } from "../../actions/action";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
function Option() {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.selectedId);

  const handleUpdate = () => {
    dispatch({ type: OPEN_MODAL, payload: true });
  };
  const handleDelete = () => {
    dispatch({ type: LOADING });
    dispatch(deleteMemory(currentId));
  };
  const handleShare = () => {
    dispatch({ type: OPEN_SHARE_MODAL, payload: true });
  };
  return (
    <div className="option-div">
      <ul style={{ listStyle: "none" }}>
        <li>
          <button className="button" onClick={handleUpdate}>
            <EditIcon />
            <span style={{ marginRight: "10px" }}>Edit</span>
          </button>
        </li>

        <li>
          <button className="button" onClick={handleShare}>
            <ShareIcon /> <span>Share</span>
          </button>
        </li>
        <li>
          <button className="button" onClick={handleDelete}>
            <DeleteIcon /> <span>Delete</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Option;
