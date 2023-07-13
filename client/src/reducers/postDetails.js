import {
  CLEAR_POST_DETAILS,
  CLOSE_POST_DETAILS,
  OPEN_POST_DETAILS,
  SELECT_POST_DETAILS,
} from "../actions/action";

export const postDetails = (
  state = { postState: false, currentPost: null },
  action
) => {
  switch (action.type) {
    case OPEN_POST_DETAILS:
      return { ...state, postState: true };
    case CLOSE_POST_DETAILS:
      return { ...state, postState: false };
    case SELECT_POST_DETAILS:
      // console.log(action.payload);
      return { postState: true, currentPost: action.payload };
    case CLEAR_POST_DETAILS:
      return { postState: false, currentPost: null };
    default:
      return state;
  }
};
