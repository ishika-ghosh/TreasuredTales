import { FETCH_GROUP, CREATE_GROUP } from "../actions/action";

const initialState = { loading: false, groups: [], error: null };

export const group = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUP:
      return {
        ...state,
        loading: false,
        groups: action?.payload,
      };
    case CREATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action?.payload],
      };
    default:
      return state;
  }
};
