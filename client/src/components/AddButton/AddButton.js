import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { openModal } from "../../actions/modal";

function AddButton({ setOpen }) {
  const dispatch = useDispatch();
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
        top: "20px",
        right: "20px",
        zIndex: "100",
        padding: "10px",
        paddingRight: "20px",
      }}
      onClick={handleOpen}
    >
      <AddIcon sx={{ mr: "10px", ml: "0px" }} />
      Add New
    </Button>
  );
}

export default AddButton;
