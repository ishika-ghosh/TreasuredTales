import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  sharePost,
  getGroupPost,
  createGroupPost,
  updateGroupPost,
  deleteGroupPost,
} from "./../api/Post";
import {
  FETCH_ALL,
  CREATE_POST,
  UPDATE_POST,
  DELETE,
  LOGOUT,
  SUCCESS,
  CLEAR_SELECTED_POST,
  SHARE_POST_ERROR,
  CLOSE_POST_MODAL,
  GET_GROUP_POSTS,
  CREATE_GROUP_POST,
  UPDATE_GROUP_POST,
  DELETE_GROUP_POST,
} from "./action";

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
    dispatch({ type: CLEAR_SELECTED_POST });
    dispatch({ type: CLOSE_POST_MODAL });
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
    dispatch({ type: CLEAR_SELECTED_POST });
    dispatch({ type: CLOSE_POST_MODAL });
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
    dispatch({ type: CLEAR_SELECTED_POST });
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
    dispatch({ type: CLEAR_SELECTED_POST });
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
export const getAllGroupPosts = (id) => async (dispatch) => {
  try {
    const { data } = await getGroupPost(id);
    console.log(data);
    dispatch({ type: GET_GROUP_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const addGroupPost = (id, post) => async (dispatch) => {
  try {
    const { data } = await createGroupPost(id, post);
    console.log(data);
    dispatch({ type: CREATE_GROUP_POST, payload: data });
    dispatch({ type: CLOSE_POST_MODAL });
    dispatch({ type: SUCCESS, payload: "Group Memory created successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const updateGroupMemory = (postId, post) => async (dispatch) => {
  try {
    const { data } = await updateGroupPost(postId, post);
    dispatch({ type: UPDATE_GROUP_POST, payload: data });
    dispatch({ type: CLEAR_SELECTED_POST });
    dispatch({ type: CLOSE_POST_MODAL });
    dispatch({ type: SUCCESS, payload: "Memory updated successfully" });
  } catch (error) {}
};
export const deleteGroupMemory = (postId, groupId) => async (dispatch) => {
  try {
    await deleteGroupPost(groupId, postId);
    dispatch({ type: DELETE_GROUP_POST, payload: postId });
    dispatch({ type: CLEAR_SELECTED_POST });
    dispatch({ type: SUCCESS, payload: "Memory deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
