import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  sharePost,
} from "./../api/Post";
import {
  FETCH_ALL,
  CREATE_POST,
  UPDATE_POST,
  DELETE,
  LOGOUT,
  SUCCESS,
  UPDATE,
  SHARE_POST_ERROR,
} from "./action";
import { CLOSE_MODAL } from "./action";

export const fetchPosts = (setIsloading) => async (dispatch) => {
  try {
    const { data } = await getPosts();
    setIsloading(false);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGOUT });
  }
};
export const createMemory = (post) => async (dispatch) => {
  try {
    const { data } = await createPost(post);
    console.log(data);
    dispatch({ type: CREATE_POST, payload: data });
    dispatch({ type: UPDATE, payload: null });
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: SUCCESS, payload: "Memory created successfully" });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGOUT });
  }
};

export const updateMemory = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await updatePost(id, updatedPost);
    console.log(data);
    dispatch({ type: UPDATE_POST, payload: data });
    dispatch({ type: UPDATE, payload: null });
    dispatch({ type: CLOSE_MODAL, payload: false });
    dispatch({ type: SUCCESS, payload: "Memory updated successfully" });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGOUT });
  }
};
export const deleteMemory = (id) => async (dispatch) => {
  try {
    await deletePost(id);
    dispatch({ type: DELETE, payload: id });
    dispatch({ type: UPDATE, payload: null });
    dispatch({ type: SUCCESS, payload: "Memory deleted successfully" });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGOUT });
  }
};
export const shareMemory = (id, shareData) => async (dispatch) => {
  try {
    const { data } = await sharePost(id, shareData);
    console.log(data);
    dispatch({ type: UPDATE_POST, payload: data });
    dispatch({ type: UPDATE, payload: null });
    dispatch({
      type: SUCCESS,
      payload: "Your memory has been successfully shared",
    });
  } catch (err) {
    const { response } = err;
    console.log(err);
    dispatch({ type: SHARE_POST_ERROR, payload: response.data.error });
  }
};
