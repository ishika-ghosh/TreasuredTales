import { updateMemory } from "../../actions/posts";
import { setOptionId } from "../../actions/options";
import { createMemory } from "../../actions/posts";
import { LOADING } from "../../actions/action";

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
    dispatch(setOptionId(null));
  }
};
