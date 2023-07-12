import {
  FETCH_GROUP,
  CREATE_GROUP,
  GROUP_LOADING,
  GROUP_ERROR,
  DELETE_GROUP,
} from "../actions/action";

const initialState = { loading: false, groups: [], error: null };

export const group = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUP:
      return {
        error: null,
        loading: false,
        groups: action?.payload,
      };
    case CREATE_GROUP:
      return {
        error: null,
        loading: false,
        groups: [...state.groups, action?.payload],
      };
    case DELETE_GROUP:
      return {
        ...state,
        loading: false,
        groups: state.groups.filter((group) => group._id !== action?.payload),
      };
    case GROUP_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GROUP_ERROR:
      return {
        ...state,
        loading: false,
        error: action?.payload,
      };
    default:
      return state;
  }
};
