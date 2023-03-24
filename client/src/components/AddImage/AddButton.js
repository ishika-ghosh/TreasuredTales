import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../actions/modal";

function AddButton() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth.authData);
  const handleOpen = () => {
    dispatch(openModal());
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
        Add New
      </Typography>
    </Button>
  );
}

export default AddButton;
