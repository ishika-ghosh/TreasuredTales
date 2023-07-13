import { SUCCESS, CLOSE_SNACKBAR, ERROR } from "../actions/action";
export const snackbarState = (
  state = { state: false, message: "", severity: "" },
  action
) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        message: action.payload,
        state: true,
        severity: "success",
      };
    case CLOSE_SNACKBAR:
      return { ...state, message: "", state: false };
    case ERROR:
      // console.log(action.payload);
      return {
        ...state,
        state: true,
        message: action?.payload,
        severity: "error",
      };
    default:
      return state;
  }
};
