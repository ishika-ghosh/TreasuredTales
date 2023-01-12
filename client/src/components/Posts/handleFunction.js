import { setOptionId } from "../../actions/options";
export const handleFunction = (clickedId, dispatch, _id) => {
  var id = null;
  if (clickedId != null) {
    id = null;
  } else {
    id = _id;
  }
  dispatch(setOptionId(id));
};
