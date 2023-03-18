import { Modal } from "@mui/material";
import AddButton from "./AddButton";
import { useDispatch } from "react-redux";
import { closeModal } from "../../actions/modal";
import { setOptionId } from "../../actions/options";
import AddAndUpdate from "./AddAndUpdate";

export default function AddImage({ open }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(setOptionId(null));
  };
  return (
    <>
      <AddButton />
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
