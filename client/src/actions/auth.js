import { signUp, signIn } from "../api/auth";
import { AUTH, AUTH_ERROR } from "./action";
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await signUp(formData);

    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    const { response } = error;
    dispatch({ type: AUTH_ERROR, payload: response.data.error });
  }
};
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await signIn(formData);
    dispatch({ type: AUTH, payload: data });
    navigate("/");
  } catch (error) {
    const { response } = error;
    dispatch({ type: AUTH_ERROR, payload: response.data.error });
  }
};
