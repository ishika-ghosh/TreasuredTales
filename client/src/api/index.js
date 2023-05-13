import axios from "axios";
const baseURL = "https://treasured-tales.vercel.app/";
// const baseURL = "http://localhost:5000/";
// https://memories-backend-ten.vercel.app
export const API = axios.create({ baseURL });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
