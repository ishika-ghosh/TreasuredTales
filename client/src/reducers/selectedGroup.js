import { CLEAR_SELECTED_GROUP, SELECTED_GROUP } from "./../actions/action";
export const selectedGroup = (state = null, action) => {
  switch (action.type) {
    case SELECTED_GROUP:
      return action.payload;
    case CLEAR_SELECTED_GROUP:
      return null;
    default:
      return state;
  }
};
