import { useSelector, useDispatch } from "react-redux";
import { Typography, CircularProgress } from "@mui/material";
import AddButton from "../common/AddButton";
import GroupForm from "../Forms/GroupForm";
import CommonModal from "../common/CommonModal";
import {
  OPEN_GROUP_MODAL,
  CLOSE_GROUP_MODAL,
  CLEAR_SELECTED_GROUP,
} from "../../actions/action";

function CreateGroup() {
  const loading = useSelector((state) => state.group.loading);
  const groupModal = useSelector((state) => state.modal.groupModal);
  const dispatch = useDispatch();
  const handleGroupModalOpen = () => {
    dispatch({ type: OPEN_GROUP_MODAL });
  };
  const handleGroupModalClose = () => {
    dispatch({ type: CLOSE_GROUP_MODAL });
    dispatch({ type: CLEAR_SELECTED_GROUP });
  };
  return (
    <>
      <AddButton title="New Group" handleOpen={handleGroupModalOpen} />
      <CommonModal open={groupModal} handleClose={handleGroupModalClose}>
        <Typography component="h1" variant="h5" id="transition-modal-title">
          Creating Group
        </Typography>
        {loading ? <CircularProgress /> : <GroupForm />}
      </CommonModal>
    </>
  );
}

export default CreateGroup;
