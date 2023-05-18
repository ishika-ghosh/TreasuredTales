import {
  updateMemory,
  createMemory,
  addGroupPost,
  updateGroupMemory,
} from "../../actions/posts";
import {
  LOADING,
  SET_SELECTED_POST,
  GROUP_POST_LOADING,
} from "../../actions/action";

export const handleSubmit = (
  postData,
  dispatch,
  currentId,
  handleClear,
  currentGroupId
) => {
  const { title, message, selectedFile } = postData;
  if (title === "" || message === "" || selectedFile === "") {
    alert("please fill all the form");
  } else {
    if (currentGroupId) {
      dispatch({ type: GROUP_POST_LOADING });
      if (currentId) {
        dispatch(updateGroupMemory(currentId, postData));
        handleClear();
      } else {
        dispatch(addGroupPost(currentGroupId, postData));
        handleClear();
      }
    } else {
      dispatch({ type: LOADING });
      if (currentId) {
        dispatch(updateMemory(currentId, postData));
        handleClear();
      } else {
        dispatch(createMemory(postData));
        handleClear();
      }
    }
    dispatch({ type: SET_SELECTED_POST, payload: null });
  }
};
