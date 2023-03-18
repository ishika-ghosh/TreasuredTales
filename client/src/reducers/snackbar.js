import { SUCCESS, CLOSE_SNACKBAR } from "../actions/action";
export const snackbarState = (
  state = { state: false, message: "" },
  action
) => {
  switch (action.type) {
    case SUCCESS:
      return { ...state, message: action.payload, state: true };
    case CLOSE_SNACKBAR:
      return { ...state, message: "", state: false };
    default:
      return state;
  }
};
