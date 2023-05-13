import {
  OPEN_GROUP_MODAL,
  CLOSE_GROUP_MODAL,
  OPEN_POST_MODAL,
  CLOSE_POST_MODAL,
  OPEN_SHARE_MODAL,
  CLOSE_SHARE_MODAL,
} from "../actions/action";

export const modal = (
  state = { postModal: false, shareModal: false, groupModal: false },
  action
) => {
  switch (action.type) {
    case OPEN_SHARE_MODAL:
      return { ...state, shareModal: true };
    case CLOSE_SHARE_MODAL:
      return { ...state, shareModal: false };
    case OPEN_POST_MODAL:
      return { ...state, postModal: true };
    case CLOSE_POST_MODAL:
      return { ...state, postModal: false };
    case OPEN_GROUP_MODAL:
      return { ...state, groupModal: true };
    case CLOSE_GROUP_MODAL:
      return { ...state, groupModal: false };
    default:
      return state;
  }
};
