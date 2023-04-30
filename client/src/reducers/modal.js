// import {
//   OPEN_MODAL,
//   CLOSE_MODAL,
//   OPEN_SHARE_MODAL,
//   CLOSE_SHARE_MODAL,
//   OPEN_GROUP_MODAL,
//   CLOSE_GROUP_MODAL,

import {
  CLOSE_MODAL,
  OPEN_MODAL,
  OPEN_SHARE_MODAL,
  CLOSE_SHARE_MODAL,
} from "../actions/action";

// } from "../actions/action";
export const modal = (state = { modal: false, share: false }, action) => {
  switch (action.type) {
    case OPEN_SHARE_MODAL:
      return { ...state, share: true };
    case CLOSE_SHARE_MODAL:
      return { ...state, share: false };
    case CLOSE_MODAL:
      return { ...state, modal: false };
    case OPEN_MODAL:
      return { ...state, modal: true };
    default:
      return state;
  }
};
// { post: false, share: false, group: false }
