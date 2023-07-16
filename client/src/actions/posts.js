import { handleLikePost } from "../api/sharePost";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getGroupPost,
  createGroupPost,
  updateGroupPost,
  deleteGroupPost,
  sharePost,
  likePost,
  sendToGroup,
  removeEditAccess,
  removeViewAccess,
} from "./../api/Post";
import {
  FETCH_ALL,
  CREATE_POST,
  UPDATE_POST,
  DELETE,
  LOGOUT,
  SUCCESS,
  CLEAR_SELECTED_POST,
  CLOSE_POST_MODAL,
  GET_GROUP_POSTS,
  CREATE_GROUP_POST,
  UPDATE_GROUP_POST,
  DELETE_GROUP_POST,
  SHARE_POST_LOADING,
  SHARE_POST,
  CLOSE_SHARE_MODAL,
  ERROR,
  UPDATE_SHARED_POST,
  REMOVE_FROM_SHARED_POST,
  STOP_SHARE_POST_LOADING,
  CLOSE_GROUP_SHARE_MODAL,
  CLEAR_SELECTED_GROUP,
  SELECT_POST_DETAILS,
  CLEAR_POST_DETAILS,
} from "./action";
//Individual post

export const fetchPosts = (setIsloading) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_SELECTED_GROUP });
    const { data } = await getPosts();
    setIsloading(false);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      dispatch({ type: LOGOUT });
    } else {
      const { data } = error.response;
      dispatch({ type: ERROR, payload: data?.message || data?.error });
    }
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
    if (error.response.status === 401) {
      dispatch({ type: LOGOUT });
    } else {
      const { data } = error.response;
      dispatch({ type: ERROR, payload: data?.message || data?.error });
    }
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
    if (error.response.status === 401) {
      dispatch({ type: LOGOUT });
    } else {
      const { data } = error.response;
      dispatch({ type: ERROR, payload: data?.message || data?.error });
    }
  }
};
export const deleteMemory = (id, sharedPost) => async (dispatch) => {
  try {
    await deletePost(id);
    if (sharedPost) {
      dispatch({ type: REMOVE_FROM_SHARED_POST, payload: id });
    } else {
      dispatch({ type: DELETE, payload: id });
    }
    dispatch({ type: CLEAR_SELECTED_POST });
    dispatch({ type: SUCCESS, payload: "Memory deleted successfully" });
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      dispatch({ type: LOGOUT });
    } else {
      const { data } = error.response;
      dispatch({ type: ERROR, payload: data?.message || data?.error });
    }
    dispatch({ type: CLEAR_SELECTED_POST });
  }
};
export const shareMemory = (id, shareData) => async (dispatch) => {
  try {
    dispatch({ type: SHARE_POST_LOADING });
    const { data } = await sharePost(id, shareData);
    console.log(data);
    if (!data._id) {
      dispatch({ type: ERROR, payload: data.message });
    } else {
      dispatch({ type: SUCCESS, payload: "Memory shared successfully" });
    }
    dispatch({ type: SHARE_POST, payload: data });
    dispatch({ type: CLEAR_SELECTED_POST });
    dispatch({ type: CLOSE_SHARE_MODAL });
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      dispatch({ type: LOGOUT });
    } else {
      const { data } = error.response;
      dispatch({ type: ERROR, payload: data?.message || data?.error });
    }
    dispatch({ type: CLEAR_SELECTED_POST });
    dispatch({ type: CLOSE_SHARE_MODAL });
    dispatch({ type: STOP_SHARE_POST_LOADING });
  }
};
export const handleSharedPost = (id) => async (dispatch) => {
  try {
    const { data } = await handleLikePost(id);
    console.log(data);
    dispatch({ type: UPDATE_SHARED_POST, payload: data });
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      dispatch({ type: LOGOUT });
    } else {
      const { data } = error.response;
      dispatch({ type: ERROR, payload: data?.message || data?.error });
    }
  }
};
export const updateSharedMemory = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await updatePost(id, updatedPost);
    console.log(data);
    dispatch({ type: UPDATE_SHARED_POST, payload: data });
    dispatch({ type: CLEAR_SELECTED_POST });
    dispatch({ type: CLOSE_POST_MODAL });
    dispatch({ type: SUCCESS, payload: "Memory updated successfully" });
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      dispatch({ type: LOGOUT });
    } else {
      const { data } = error.response;
      dispatch({ type: ERROR, payload: data?.message || data?.error });
    }
    dispatch({ type: CLEAR_SELECTED_POST });
    dispatch({ type: CLOSE_POST_MODAL });
  }
};
export const removeAccess = (option, postId, memberId) => async (dispatch) => {
  try {
    if (option === 1) {
      const { data } = await removeEditAccess(postId, memberId);
      dispatch({ type: SELECT_POST_DETAILS, payload: data });
    } else {
      const { data } = await removeViewAccess(postId, memberId);
      dispatch({ type: SELECT_POST_DETAILS, payload: data });
    }
    dispatch({ type: SUCCESS, payload: "Access removed successfully" });
  } catch (error) {
    if (error.response.status === 401) {
      dispatch({ type: LOGOUT });
      return;
    }
    const { data } = error.response;
    console.log(data.message);
    dispatch({
      type: ERROR,
      payload: data.message,
    });
    dispatch({ type: CLEAR_POST_DETAILS });
  }
};
//group post CRUD

export const getAllGroupPosts = (id, navigate) => async (dispatch) => {
  try {
    const { data } = await getGroupPost(id);
    console.log(data);
    dispatch({ type: GET_GROUP_POSTS, payload: data });
  } catch (error) {
    console.log(error);
    console.log(error);
    if (error.response.status === 401) {
      dispatch({ type: LOGOUT });
    } else {
      const { data } = error.response;
      dispatch({ type: ERROR, payload: data?.message || data?.error });
    }
    // navigate("/error");
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
    console.log(error);
    if (error.response.status === 401) {
      dispatch({ type: LOGOUT });
    } else {
      const { data } = error.response;
      dispatch({ type: ERROR, payload: data?.message || data?.error });
    }
  }
};
export const updateGroupMemory =
  (postId, post, groupId) => async (dispatch) => {
    try {
      const { data } = await updateGroupPost(postId, post, groupId);
      dispatch({ type: UPDATE_GROUP_POST, payload: data });
      dispatch({ type: CLEAR_SELECTED_POST });
      dispatch({ type: CLOSE_POST_MODAL });
      dispatch({ type: SUCCESS, payload: "Memory updated successfully" });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        dispatch({ type: LOGOUT });
      } else {
        const { data } = error.response;
        dispatch({ type: ERROR, payload: data?.message || data?.error });
      }
      dispatch({ type: CLEAR_SELECTED_POST });
      dispatch({ type: CLOSE_POST_MODAL });
    }
  };
export const deleteGroupMemory = (postId, groupId) => async (dispatch) => {
  try {
    await deleteGroupPost(groupId, postId);
    dispatch({ type: DELETE_GROUP_POST, payload: postId });
    dispatch({ type: CLEAR_SELECTED_POST });
    dispatch({ type: SUCCESS, payload: "Memory deleted successfully" });
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      dispatch({ type: LOGOUT });
    } else {
      const { data } = error.response;
      dispatch({ type: ERROR, payload: data?.message || data?.error });
    }
    dispatch({ type: CLEAR_SELECTED_POST });
  }
};
export const LikeGroupPost = (postId, groupId) => async (dispatch) => {
  try {
    const { data } = await likePost(groupId, postId);
    console.log(data);
    dispatch({ type: UPDATE_GROUP_POST, payload: data });
    dispatch({ type: CLEAR_SELECTED_POST });
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      dispatch({ type: LOGOUT });
    } else {
      const { data } = error.response;
      dispatch({ type: ERROR, payload: data?.message || data?.error });
    }
    dispatch({ type: CLEAR_SELECTED_POST });
  }
};
export const shareToGroup =
  (postId, groupId, isGroupPost) => async (dispatch) => {
    try {
      const { data } = await sendToGroup(groupId, postId);
      if (isGroupPost) {
        dispatch({ type: UPDATE_GROUP_POST, payload: data });
      } else {
        dispatch({ type: UPDATE_POST, payload: data });
      }
      dispatch({ type: CLEAR_SELECTED_POST });
      dispatch({ type: CLOSE_GROUP_SHARE_MODAL });
      dispatch({ type: SUCCESS, payload: "Memory send to group successfully" });
    } catch (error) {
      console.log(error);
      const { data } = error.response;
      console.log(data.message);
      dispatch({
        type: ERROR,
        payload: data.message,
      });
      dispatch({ type: CLEAR_SELECTED_POST });
    }
  };
