import { CLOSE_POST_DETAILS, OPEN_POST_DETAILS } from "../actions/action";

export const postDetails = (state = false, action) => {
  switch (action.type) {
    case OPEN_POST_DETAILS:
      return true;
    case CLOSE_POST_DETAILS:
      return false;
    default:
      return state;
  }
};
