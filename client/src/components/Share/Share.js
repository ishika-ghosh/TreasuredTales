import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShareIcon from "@mui/icons-material/Share";
import { Avatar, Box, Typography, Container, Fade, Modal } from "@mui/material";
import ShareForm from "../Forms/ShareForm";
import { CLOSE_SHARE_MODAL, REMOVE_SHARE_ERROR } from "./../../actions/action";
import { setOptionId } from "./../../actions/options";
import { shareMemory } from "./../../actions/posts";

function Share() {
  const [shareData, setShareData] = useState({
    access: "",
    email: "",
  });
  const dispatch = useDispatch();
  const share = useSelector((state) => state.modal.share);
  const currentId = useSelector((state) => state.selectedId);
  const exception = useSelector((state) => state.posts.error);
  const handleClose = () => {
    dispatch({ type: CLOSE_SHARE_MODAL, payload: false });
    dispatch(setOptionId(null));
  };
  const handleChange = (e) => {
    if (exception) {
      dispatch({ type: REMOVE_SHARE_ERROR });
    }
    setShareData({ ...shareData, [e.target.name]: e.target.value });
  };
  const handleShare = () => {
    dispatch(shareMemory(currentId, shareData));
    setShareData({ access: "", email: "" });
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={share}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={share}>
        <Container component="main" maxWidth="xs">
          <Box sx={styles}>
            <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
              <ShareIcon />
            </Avatar>

            <Typography
              component="h1"
              variant="h6"
              id="transition-modal-title"
              sx={{ mb: 2 }}
            >
              Share memories with your friends
            </Typography>
            <ShareForm
              handleChange={handleChange}
              shareData={shareData}
              handleShare={handleShare}
              error={exception}
            />
          </Box>
        </Container>
      </Fade>
    </Modal>
  );
}

export default Share;
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
  width: 400,
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};
