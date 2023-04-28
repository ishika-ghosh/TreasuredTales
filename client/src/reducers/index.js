import { combineReducers } from "redux";
import { posts } from "./posts";
import { modal } from "./modal";
import { selectedId } from "./selectedId";
import { userAuth } from "./auth";
import { snackbarState } from "./snackbar";
import { group } from "./group";

export default combineReducers({
  posts,
  modal,
  selectedId,
  userAuth,
  snackbarState,
  group,
});
