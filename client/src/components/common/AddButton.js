import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL, OPEN_GROUP_MODAL } from "../../actions/action";

function AddButton({ title, modal_type }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth.authData);
  const handleOpen = () => {
    if (modal_type === "POST") {
      dispatch({ type: OPEN_MODAL, payload: true });
    }
    if (modal_type === "GROUP") {
      dispatch({ type: OPEN_GROUP_MODAL });
    }
  };
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        mt: "80px",
        position: "fixed",
        top: { xs: "50px", md: "20px" },
        right: "20px",
        zIndex: "100",
        padding: "10px",
        paddingRight: { xs: "0px", md: "20px" },
      }}
      onClick={handleOpen}
      disabled={user === null}
    >
      <AddIcon sx={{ mr: "10px", ml: "0px" }} />
      <Typography variant="h8" sx={{ display: { xs: "none", md: "block" } }}>
        {title}
      </Typography>
    </Button>
  );
}

export default AddButton;
