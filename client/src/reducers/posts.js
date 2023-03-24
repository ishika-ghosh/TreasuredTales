import {
  SHARE_POST_ERROR,
  DELETE,
  UPDATE_POST,
  FETCH_ALL,
  CREATE_POST,
  LOADING,
  REMOVE_SHARE_ERROR,
} from "../actions/action";
const initialState = { loading: false, posts: [], error: null };
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
    case SHARE_POST_ERROR:
      return { ...state, error: action?.payload };
    case REMOVE_SHARE_ERROR:
      return { ...state, error: null };
    case LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
