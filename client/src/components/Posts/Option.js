import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../actions/modal";
import { deleteMemory } from "../../actions/posts";
import { LOADING, OPEN_SHARE_MODAL } from "../../actions/action";
function Option() {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.selectedId);

  const handleUpdate = () => {
    dispatch(openModal());
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
            Edit
          </button>
        </li>
        <li>
          <button className="button" onClick={handleDelete}>
            Delete
          </button>
        </li>
        <li>
          <button className="button" onClick={handleShare}>
            Share
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Option;
