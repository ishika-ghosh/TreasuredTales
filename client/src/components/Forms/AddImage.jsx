import { Modal } from "@mui/material";
import AddButton from "../AddButton/AddButton";
import { useDispatch } from "react-redux";
import Form from "./Form";
import { closeModal } from "../../actions/modal";
import { setOptionId } from "./../../actions/options";

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
        <Form open={open} />
      </Modal>
    </>
  );
}
