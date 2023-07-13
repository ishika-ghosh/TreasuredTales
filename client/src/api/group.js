import { API } from "./index";
const URL = "/groups";

export const getAllGroups = () => API.get(URL);
export const createGroup = (groupData) => API.post(URL, groupData);
export const renameGroup = (id, newName) =>
  API.patch(`${URL}/${id}`, { newName });
export const deleteGroup = (id) => API.delete(`${URL}/${id}`);
export const addtoGroup = (id, newmember) =>
  API.patch(`${URL}/addtogroup/${id}`, { memberId: newmember });
export const removefromGroup = (id, memberId) =>
  API.patch(`${URL}/removefromgroup/${id}`, { memberId });
export const giveAccess = (groupId, memberId) =>
  API.patch(`${URL}/give-access/${groupId}`, { memberId });
export const leaveGroup = (groupId) =>
  API.patch(`${URL}/leave-group/${groupId}`);
export const getGroupDetails = (id) => API.get(`${URL}/${id}`);
export const getSuggestions = () => API.get(`${URL}/options`);
