import React from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroupMemory, deleteMemory } from "../../actions/posts";
import {
  GROUP_POST_LOADING,
  LOADING,
  OPEN_POST_MODAL,
  OPEN_SHARE_MODAL,
  SET_SELECTED_SHARED_POST,
} from "../../actions/action";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import { Divider } from "@mui/material";
import { fetchGroupSuggestions } from "../../actions/groups";
function Option({
  sharedPost,
  editor,
  groupPost,
  hasAccess,
  isCreator,
  groups,
}) {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.selectedId);
  const currentGroupId = useSelector((state) => state.selectedGroup);
  const userId = useSelector((state) => state.userAuth.authData.data._id);
  const handleUpdate = () => {
    dispatch({ type: OPEN_POST_MODAL });
    if (sharedPost) {
      dispatch({ type: SET_SELECTED_SHARED_POST });
    }
  };
  const handleDelete = () => {
    if (currentGroupId) {
      dispatch({ type: GROUP_POST_LOADING });
      dispatch(deleteGroupMemory(currentId, currentGroupId));
    } else {
      dispatch({ type: LOADING });
      dispatch(deleteMemory(currentId, sharedPost));
    }
  };
  const handleShare = () => {
    dispatch({ type: OPEN_SHARE_MODAL });
  };
  const handleGroupShare = () => {
    dispatch(fetchGroupSuggestions(groups));
  };

  return (
    <div className="option-div">
      <ul style={{ listStyle: "none" }}>
        {((editor.includes(userId) && sharedPost) ||
          (groupPost && hasAccess) ||
          isCreator) && (
          <li>
            <button className="button" onClick={handleUpdate}>
              <EditIcon />
              <span style={{ marginRight: "10px", textAlign: "right" }}>
                Edit
              </span>
            </button>
          </li>
        )}
        <Divider />
        {!currentGroupId && !sharedPost && (
          <>
            <li>
              <button className="button" onClick={handleShare}>
                <ShareIcon /> <span>Share</span>
              </button>
            </li>
            <Divider />
          </>
        )}
        {isCreator && !sharedPost && (
          <>
            <li>
              <button className="button" onClick={handleGroupShare}>
                <SendIcon /> <span>Send</span>
              </button>
            </li>
            <Divider />
          </>
        )}

        {!currentGroupId && hasAccess && (
          <li>
            <button className="button" onClick={handleDelete}>
              <DeleteIcon />
              {sharedPost ? <span>Remove</span> : <span>Delete</span>}
            </button>
          </li>
        )}
        {currentGroupId && hasAccess && (
          <button className="button" onClick={handleDelete}>
            <DeleteIcon />
            <span>Remove</span>
          </button>
        )}
      </ul>
    </div>
  );
}

export default Option;
