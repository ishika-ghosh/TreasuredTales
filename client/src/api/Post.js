import { API } from "./index";
const URL = "/posts";
//individual posts
export const getPosts = () => API.get(URL);
export const createPost = (postData) => API.post(URL, postData);
export const updatePost = (id, updatedPost) =>
  API.patch(`${URL}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${URL}/${id}`);
export const sharePost = (id, shareData) =>
  API.patch(`${URL}/share/${id}`, shareData);

//Group Posts
export const getGroupPost = (id) => API.get(`${URL}?groupid=${id}`);
export const createGroupPost = (groupId, postData) =>
  API.post(`${URL}?groupid=${groupId}`, postData);
export const updateGroupPost = (postId, updatedPostData, groupId) =>
  API.patch(`${URL}/${postId}?groupid=${groupId}`, updatedPostData);
export const deleteGroupPost = (groupId, postId) =>
  API.delete(`${URL}/${postId}?groupid=${groupId}`);
export const likePost = (groupId, postId) =>
  API.patch(`${URL}/like-post/${postId}?groupid=${groupId}`);
export const sendToGroup = (groupId, postId) =>
  API.patch(`${URL}/share-to-group/${postId}`, { groupId });
export const removeEditAccess = (postId, memberId) =>
  API.patch(`${URL}/remove-access/editor/${postId}`, { memberId });
export const removeViewAccess = (postId, memberId) =>
  API.patch(`${URL}//remove-access/viewer/${postId}`, { memberId });
