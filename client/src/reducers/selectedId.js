import { SET_SELECTED_POST, CLEAR_SELECTED_POST } from "../actions/action";
export const selectedId = (state = null, action) => {
  switch (action.type) {
    case SET_SELECTED_POST:
      return action.payload;
    case CLEAR_SELECTED_POST:
      return null;
    default:
      return state;
  }
};
