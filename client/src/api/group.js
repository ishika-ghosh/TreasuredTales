import { API } from "./index";
const URL = "/groups";

export const getAllGroups = () => API.get(URL);
export const createGroup = (groupData) => API.post(URL, groupData);
