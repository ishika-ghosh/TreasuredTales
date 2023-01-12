import { combineReducers } from "redux";
import { posts } from "./posts";
import { modal } from "./modal";
import { selectedId } from "./selectedId";
import { userAuth } from "./auth";

export default combineReducers({ posts, modal, selectedId, userAuth });
