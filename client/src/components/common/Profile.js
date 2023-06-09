import { useSelector } from "react-redux";
import { Container, Fade, Modal } from "@mui/material";
import "./style.css";

function Profile({ open, handleProfile }) {
  const user = useSelector((state) => state.userAuth.authData.data);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={open}
      onClose={handleProfile}
      closeAfterTransition
    >
      <Fade in={open}>
        <Container component="main" maxWidth="xs">
          <div className="card">
            <div className="card__border">
              <div className="card__img">{user.name[0]}</div>
            </div>

            <h3 className="card__name">{user.name}</h3>
            <span className="card__profession">{user.email}</span>
          </div>
        </Container>
      </Fade>
    </Modal>
  );
}

export default Profile;
