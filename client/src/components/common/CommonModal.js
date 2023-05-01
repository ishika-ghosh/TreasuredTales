import { Modal, Fade, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE } from "../../actions/action";
function CommonModal({ children }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.modal);
  const handleClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: UPDATE, payload: null });
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Container component="main" maxWidth="xs">
          {children}
        </Container>
      </Fade>
    </Modal>
  );
}

export default CommonModal;
