import { useSelector, useDispatch } from "react-redux";
import AddAndUpdate from "./AddAndUpdate";
import AddButton from "../common/AddButton";
import CommonModal from "../common/CommonModal";
import {
  OPEN_POST_MODAL,
  CLOSE_POST_MODAL,
  CLEAR_SELECTED_POST,
} from "../../actions/action";

export default function AddPost() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.postModal);
  const handleOpen = () => {
    dispatch({ type: OPEN_POST_MODAL });
  };
  const handleClose = () => {
    dispatch({ type: CLOSE_POST_MODAL });
    dispatch({ type: CLEAR_SELECTED_POST });
  };
  return (
    <>
      <AddButton title={"ADD NEW"} handleOpen={handleOpen} />
      <CommonModal open={open} handleClose={handleClose}>
        <AddAndUpdate open={open} />
      </CommonModal>
    </>
  );
}
