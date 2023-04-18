import { getAllGroups, createGroup } from "../api/group";
import { CREATE_GROUP, FETCH_GROUP, LOGOUT } from "./action";

export const fetchAllGroups = (setIsloading) => async (dispatch) => {
  try {
    const { data } = await getAllGroups();
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
  } catch (err) {
    console.log(err);
  }
};
