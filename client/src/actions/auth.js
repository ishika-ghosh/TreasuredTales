import { signUp, signIn } from "../api/auth";
import { AUTH, ERROR, SUCCESS } from "./action";
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await signUp(formData);

    dispatch({ type: AUTH, payload: data });
    navigate("/");
    dispatch({ type: SUCCESS, payload: "you have signed up successfully" });
  } catch (error) {
    const { response } = error;
    dispatch({ type: ERROR, payload: response.data.error });
  }
};
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await signIn(formData);
    dispatch({ type: AUTH, payload: data });
    navigate("/");
    dispatch({
      type: SUCCESS,
      payload: "You have been signed in successfully",
    });
  } catch (error) {
    const { response } = error;
    console.log(error);
    dispatch({ type: ERROR, payload: response.data.error });
  }
};
