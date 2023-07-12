import React from "react";
import { Button } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useDispatch, useSelector } from "react-redux";
import {
  OPEN_POST_MODAL,
  CLOSE_POST_MODAL,
  CLEAR_SELECTED_POST,
} from "./../../actions/action";
import CommonModal from "./../common/CommonModal";
import AddAndUpdate from "../AddImage/AddAndUpdate";
import Posts from "../Posts/Posts";
function GroupPosts() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal.postModal);
  const loading = useSelector((state) => state.currentGroup.postLoading);
  const groupPosts = useSelector((state) => state.currentGroup.posts);
  const group = useSelector((state) => state.currentGroup.details);
  const user = useSelector((state) => state.userAuth.authData);

  const handleModal = () => {
    dispatch({ type: OPEN_POST_MODAL });
  };
  const handleClose = () => {
    dispatch({ type: CLOSE_POST_MODAL });
    dispatch({ type: CLEAR_SELECTED_POST });
  };

  return (
    <div>
      {group?.access.includes(user?.data?._id) && (
        <Button
          variant="contained"
          startIcon={<AddAPhotoIcon />}
          sx={{
            mt: "120px",
            position: "fixed",
            top: "40px",
            right: "20px",
            zIndex: 100,
          }}
          onClick={handleModal}
        >
          Add Photo
        </Button>
      )}
      <CommonModal open={modalState} handleClose={handleClose}>
        <AddAndUpdate open={modalState} loading={loading} />
      </CommonModal>
      <Posts
        isloading={loading}
        posts={groupPosts}
        sharedPosts={false}
        groupPosts={true}
      />
    </div>
  );
}

export default GroupPosts;
