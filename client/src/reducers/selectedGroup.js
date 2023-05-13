import { CLEAR_SELECTED_GROUP, SELECTED_GROUP } from "./../actions/action";
export const selectedGroup = (state = null, action) => {
  switch (action.type) {
    case SELECTED_GROUP:
      localStorage.setItem("SelectedGroup", action?.payload);
      return action.payload;
    case CLEAR_SELECTED_GROUP:
      localStorage.removeItem("SelectedGroup");
      return null;
    default:
      return state;
  }
};
