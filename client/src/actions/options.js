import { UPDATE } from "./action";
export const setOptionId = (id) => {
  return {
    type: UPDATE,
    payload: id,
  };
};
