import {
  getAllGroups,
  createGroup,
  getGroupDetails,
  removefromGroup,
  deleteGroup,
  renameGroup,
  addtoGroup,
  giveAccess,
  leaveGroup,
} from "../api/group";
import {
  CLOSE_GROUP_MODAL,
  CREATE_GROUP,
  FETCH_GROUP,
  LOGOUT,
  SUCCESS,
  GROUP_ERROR,
  CURRENT_GROUP_DETAILS,
  CURRENT_GROUP_LOADING,
  DELETE_GROUP,
  CLEAR_SELECTED_GROUP,
} from "./action";

export const fetchAllGroups = (setIsloading) => async (dispatch) => {
  try {
    const { data } = await getAllGroups();
    console.log(data);
    setIsloading(false);
    dispatch({ type: FETCH_GROUP, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGOUT });
  }
};
export const createNewGroup = (groupData) => async (dispatch) => {
  try {
    const { data } = await createGroup(groupData);
    console.log(data);
    dispatch({ type: CREATE_GROUP, payload: data });
    dispatch({ type: SUCCESS, payload: "Group Created Successfully" });
    dispatch({ type: CLOSE_GROUP_MODAL });
  } catch (err) {
    const {
      response: { data },
    } = err;
    console.log(data);
    dispatch({ type: GROUP_ERROR, payload: data.error });
  }
};

export const groupDetails = (id) => async (dispatch) => {
  try {
    const { data } = await getGroupDetails(id);
    dispatch({ type: CURRENT_GROUP_DETAILS, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const kickFromGroup = (id, memberId) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_GROUP_LOADING });
    const { data } = await removefromGroup(id, memberId);
    console.log(data);
    dispatch({ type: CURRENT_GROUP_DETAILS, payload: data });
    dispatch({ type: SUCCESS, payload: "member has been kicked successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const deleteGroupWithAllMemories = (id) => async (dispatch) => {
  try {
    await deleteGroup(id);
    dispatch({ type: DELETE_GROUP, payload: id });
    dispatch({ type: SUCCESS, payload: "Group deleted successfully" });
    dispatch({ type: CLEAR_SELECTED_GROUP });
  } catch (error) {
    console.log(error);
  }
};
export const groupRename = (id, name) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_GROUP_LOADING });
    const { data } = await renameGroup(id, name);
    dispatch({ type: CURRENT_GROUP_DETAILS, payload: data });
    dispatch({ type: SUCCESS, payload: "Group renamed successfully" });
  } catch (error) {}
};
export const addMembers = (id, member) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_GROUP_LOADING });
    const { data } = await addtoGroup(id, member);
    dispatch({ type: CURRENT_GROUP_DETAILS, payload: data });
    dispatch({ type: SUCCESS, payload: "Member added successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const giveAccessOfGroup = (groupId, memberId) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_GROUP_LOADING });
    const { data } = await giveAccess(groupId, memberId);
    console.log(data);
    dispatch({ type: CURRENT_GROUP_DETAILS, payload: data });
    dispatch({ type: SUCCESS, payload: "Given Access Successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const leaveAGroup = (groupId) => async (dispatch) => {
  try {
    const { data } = await leaveGroup(groupId);
    console.log(data);
    dispatch({ type: DELETE_GROUP, payload: groupId });
    dispatch({ type: SUCCESS, payload: "You left the group successfully" });
    dispatch({ type: CLEAR_SELECTED_GROUP });
  } catch (error) {
    console.log(error);
  }
};
