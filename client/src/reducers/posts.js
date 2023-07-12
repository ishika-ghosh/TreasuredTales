import {
  DELETE,
  UPDATE_POST,
  FETCH_ALL,
  CREATE_POST,
  LOADING,
  SHARE_POST_LOADING,
  SHARE_POST,
  STOP_SHARE_POST_LOADING,
} from "../actions/action";
const initialState = {
  loading: false,
  posts: [],
  error: null,
  shareLoading: false,
};
export const posts = (state = initialState, action) => {
  switch (action.type) {
    case DELETE:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((s) =>
          s._id === action.payload._id ? action.payload : s
        ),
      };
    case FETCH_ALL:
      console.log(action.payload);
      return { ...state, loading: false, posts: action?.payload };

    case CREATE_POST:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload],
      };
    case LOADING:
      return { ...state, loading: true };
    case SHARE_POST_LOADING:
      return { ...state, shareLoading: true };
    case STOP_SHARE_POST_LOADING:
      return { ...state, shareLoading: false };
    case SHARE_POST:
      return {
        ...state,
        shareLoading: false,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    default:
      return state;
  }
};
