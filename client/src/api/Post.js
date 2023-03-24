import { API } from "./index";
const URL = "/posts";

export const getPosts = () => API.get(URL);
export const createPost = (postData) => API.post(URL, postData);
export const updatePost = (id, updatedPost) =>
  API.patch(`${URL}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${URL}/${id}`);
export const sharePost = (id, shareData) =>
  API.patch(`${URL}/share/${id}`, shareData);
