import {
  CREATE_GROUP_POST,
  CURRENT_GROUP_DETAILS,
  CURRENT_GROUP_LOADING,
  GET_GROUP_POSTS,
  UPDATE_GROUP_POST,
  DELETE_GROUP_POST,
  GROUP_POST_LOADING,
} from "../actions/action";

export const currentGroup = (
  state = { details: null, posts: [], loading: false, postLoading: false },
  action
) => {
  switch (action?.type) {
    case CURRENT_GROUP_DETAILS:
      return { ...state, details: action?.payload, loading: false };
    case GET_GROUP_POSTS:
      return { ...state, posts: action?.payload, postLoading: false };
    case CREATE_GROUP_POST:
      return {
        ...state,
        posts: [...state.posts, action?.payload],
        postLoading: false,
      };
    case UPDATE_GROUP_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action?.payload._id ? action?.payload : post
        ),
        postLoading: false,
      };
    case DELETE_GROUP_POST:
      return {
        ...state,
        postLoading: false,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case CURRENT_GROUP_LOADING:
      return { ...state, loading: true };
    case GROUP_POST_LOADING:
      return { ...state, postLoading: true };
    default:
      return state;
  }
};
