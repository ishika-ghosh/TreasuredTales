import {
  fetchSharedPost,
  getAllEditorAccessPosts,
  getAllViewerAccessPosts,
} from "../api/sharePost";
import { FETCH_SHARE_POST, FETCH_SHARE_POST_LOADING } from "./action";

export const fetchAllMemory = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SHARE_POST_LOADING });
    const { data } = await fetchSharedPost();
    dispatch({ type: FETCH_SHARE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const fetchAllEditorAccess = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SHARE_POST_LOADING });
    const { data } = await getAllEditorAccessPosts();
    dispatch({ type: FETCH_SHARE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const fetchAllViewersAccess = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SHARE_POST_LOADING });
    const { data } = await getAllViewerAccessPosts();
    dispatch({ type: FETCH_SHARE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
