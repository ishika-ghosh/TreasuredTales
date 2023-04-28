import { Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../actions/action";
import { setOptionId } from "../../actions/options";
import AddAndUpdate from "./AddAndUpdate";
import AddButton from "../common/AddButton";

export default function Post({ open }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: CLOSE_MODAL, payload: false });
    dispatch(setOptionId(null));
  };
  return (
    <>
      <AddButton title={"ADD NEW"} modal_type="POST" />
      <Modal
        aria-labelledby="transition-modal-title"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <AddAndUpdate open={open} />
      </Modal>
    </>
  );
}
