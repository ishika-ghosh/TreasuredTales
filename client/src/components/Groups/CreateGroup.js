import { useSelector } from "react-redux";
import { Box, Typography, CircularProgress } from "@mui/material";
import AddButton from "../common/AddButton";
import GroupForm from "../Forms/GroupForm";
import CommonModal from "../common/CommonModal";

function CreateGroup() {
  const loading = useSelector((state) => state.group.loading);

  return (
    <>
      <AddButton title="New Group" modal_type="GROUP" />
      <CommonModal>
        <Box sx={styles}>
          <Typography component="h1" variant="h5" id="transition-modal-title">
            Creating Group
          </Typography>
          {loading ? <CircularProgress /> : <GroupForm />}
        </Box>
      </CommonModal>
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
