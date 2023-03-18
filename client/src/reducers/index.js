import { combineReducers } from "redux";
import { posts } from "./posts";
import { modal } from "./modal";
import { selectedId } from "./selectedId";
import { userAuth } from "./auth";
import { shareModal } from "./share";
import { snackbarState } from "./snackbar";

export default combineReducers({
  posts,
  modal,
  selectedId,
  userAuth,
  shareModal,
  snackbarState,
});
