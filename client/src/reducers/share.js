import { OPEN_SHARE_MODAL, CLOSE_SHARE_MODAL } from "../actions/action";
export const shareModal = (state = false, action) => {
  switch (action.type) {
    case OPEN_SHARE_MODAL:
      return action.payload;
    case CLOSE_SHARE_MODAL:
      return action.payload;
    default:
      return state;
  }
};
