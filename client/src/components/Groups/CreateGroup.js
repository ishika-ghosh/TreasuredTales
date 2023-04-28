import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Fade,
  Container,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddButton from "../common/AddButton";
import { CLOSE_GROUP_MODAL } from "../../actions/action";
import GroupForm from "../Forms/GroupForm";

function CreateGroup({ open }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.group.loading);
  const handleClose = () => {
    dispatch({ type: CLOSE_GROUP_MODAL });
  };
  return (
    <>
      <AddButton title="New Group" modal_type="GROUP" />
      <Modal
        aria-labelledby="transition-modal-title"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Container component="main" maxWidth="xs">
            <Box sx={styles}>
              <Typography
                component="h1"
                variant="h5"
                id="transition-modal-title"
              >
                Creating Group
              </Typography>
              {loading ? <CircularProgress /> : <GroupForm />}
            </Box>
          </Container>
        </Fade>
      </Modal>
    </>
  );
}

export default CreateGroup;
const styles = {
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  bgcolor: "#f0f6fc",
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 400, xs: 300 },
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};
