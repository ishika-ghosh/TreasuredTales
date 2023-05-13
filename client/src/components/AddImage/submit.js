import { updateMemory, createMemory } from "../../actions/posts";
import { LOADING, SET_SELECTED_POST } from "../../actions/action";

export const handleSubmit = (postData, dispatch, currentId, handleClear) => {
  const { title, message, selectedFile } = postData;
  if (title === "" || message === "" || selectedFile === "") {
    alert("please fill all the form");
  } else {
    dispatch({ type: LOADING });
    if (currentId) {
      dispatch(updateMemory(currentId, postData));
      handleClear();
    } else {
      dispatch(createMemory(postData));
      handleClear();
    }
    dispatch({ type: SET_SELECTED_POST, payload: null });
  }
};
