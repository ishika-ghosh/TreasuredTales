import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShareIcon from "@mui/icons-material/Share";
import { Avatar, Typography } from "@mui/material";
import ShareForm from "../Forms/ShareForm";
import {
  CLEAR_SELECTED_POST,
  CLOSE_SHARE_MODAL,
  REMOVE_SHARE_ERROR,
} from "./../../actions/action";
import { shareMemory } from "./../../actions/posts";
import CommonModal from "../common/CommonModal";

function Share() {
  const [shareData, setShareData] = useState({
    access: "",
    email: "",
  });
  const dispatch = useDispatch();
  const share = useSelector((state) => state.modal.shareModal);
  const currentId = useSelector((state) => state.selectedId);
  const exception = useSelector((state) => state.posts.error);

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
  const handleShareClose = () => {
    dispatch({ type: CLOSE_SHARE_MODAL });
    dispatch({ type: CLEAR_SELECTED_POST });
  };
  return (
    <CommonModal open={share} handleClose={handleShareClose}>
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
    </CommonModal>
  );
}

export default Share;
