import {
  CLEAR_SELECTED_SHARED_POST,
  FETCH_SHARE_POST,
  FETCH_SHARE_POST_LOADING,
  GET_ALL_FAVORITES,
  REMOVE_FROM_SHARED_POST,
  SET_SELECTED_SHARED_POST,
  UPDATE_SHARED_POST,
} from "../actions/action";

export const sharedPosts = (
  state = { loading: false, posts: [], selectedSharedPost: false },
  action
) => {
  switch (action.type) {
    case FETCH_SHARE_POST_LOADING:
      return { ...state, loading: true };
    case FETCH_SHARE_POST:
      return { loading: false, posts: action?.payload };
    case UPDATE_SHARED_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case REMOVE_FROM_SHARED_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action?.payload),
      };
    case GET_ALL_FAVORITES:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.isFavourite),
      };
    case SET_SELECTED_SHARED_POST:
      return {
        ...state,
        selectedSharedPost: true,
      };
    case CLEAR_SELECTED_SHARED_POST:
      return {
        ...state,
        selectedSharedPost: false,
      };
    default:
      return state;
  }
};
