import {
  CURRENT_GROUP_DETAILS,
  CURRENT_GROUP_LOADING,
  GET_GROUP_POSTS,
} from "../actions/action";

export const currentGroup = (
  state = { details: null, posts: [], loading: false },
  action
) => {
  switch (action?.type) {
    case CURRENT_GROUP_DETAILS:
      return { ...state, details: action?.payload, loading: false };
    case GET_GROUP_POSTS:
      return { ...state, posts: action?.payload, loading: false };
    case CURRENT_GROUP_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
