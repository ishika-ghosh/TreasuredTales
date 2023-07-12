import React from "react";
import { Modal, Fade, Container, Box } from "@mui/material";
function CommonModal({ children, open, handleClose }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Container component="main" maxWidth="xs">
          <Box sx={styles}>{children}</Box>
        </Container>
      </Fade>
    </Modal>
  );
}

export default CommonModal;
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
