import { AUTH, LOGOUT, PROFILE, AUTH_ERROR } from "./../actions/action";
export const userAuth = (state = { authData: null, error: null }, action) => {
  switch (action.type) {
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action?.payload));
      return { ...state, authData: action?.payload, error: null };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, error: null };
    case PROFILE:
      return { ...state, authData: action?.payload, error: null };
    default:
      return state;
  }
};
