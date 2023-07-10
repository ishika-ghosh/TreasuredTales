import { AUTH, LOGOUT, PROFILE } from "./../actions/action";
export const userAuth = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action?.payload));
      return { ...state, authData: action?.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case PROFILE:
      return { ...state, authData: action?.payload };
    default:
      return state;
  }
};
