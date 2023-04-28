import {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_SHARE_MODAL,
  CLOSE_SHARE_MODAL,
  OPEN_GROUP_MODAL,
  CLOSE_GROUP_MODAL,
} from "../actions/action";
export const modal = (
  state = { post: false, share: false, group: false },
  action
) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, post: action.payload };
    case CLOSE_MODAL:
      return { ...state, post: action.payload };
    case OPEN_SHARE_MODAL:
      return { ...state, share: action.payload };
    case CLOSE_SHARE_MODAL:
      return { ...state, share: action.payload };
    case OPEN_GROUP_MODAL:
      return { ...state, group: true };
    case CLOSE_GROUP_MODAL:
      return { ...state, group: false };
    default:
      return state;
  }
};
