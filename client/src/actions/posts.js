import { getPosts, createPost, updatePost, deletePost } from "./../api/Post";
import { FETCH_ALL, CREATE_POST, UPDATE_POST, DELETE, LOGOUT } from "./action";
import { setOptionId } from "./options";

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
    dispatch(setOptionId(null));
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGOUT });
  }
};
export const deleteMemory = (id) => async (dispatch) => {
  try {
    await deletePost(id);
    dispatch({ type: DELETE, payload: id });
    dispatch(setOptionId(null));
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGOUT });
  }
};
