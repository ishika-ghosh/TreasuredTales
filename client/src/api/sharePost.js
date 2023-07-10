import { API } from "./index";
const URL = "/share-post";

export const fetchSharedPost = () => API.get(URL);
export const handleLikePost = (id) => API.patch(`${URL}/${id}`);
export const getAllEditorAccessPosts = () => API.get(`${URL}/editor-access`);
export const getAllViewerAccessPosts = () => API.get(`${URL}/viewer-access`);
