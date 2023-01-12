import { API } from "./index";
const URL = "/auth";

export const signIn = (data) => API.post(`${URL}/signin`, data);
export const signUp = (data) => API.post(`${URL}/signup`, data);
