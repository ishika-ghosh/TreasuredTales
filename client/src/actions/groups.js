import { getAllGroups, createGroup } from "../api/group";
import {
  CLOSE_GROUP_MODAL,
  CREATE_GROUP,
  FETCH_GROUP,
  LOGOUT,
  SUCCESS,
  GROUP_ERROR,
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
