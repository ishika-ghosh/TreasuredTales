import React from "react";
import CommonModal from "./CommonModal";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import {
  CLEAR_SELECTED_POST,
  CLOSE_GROUP_SHARE_MODAL,
} from "../../actions/action";
import { shareToGroup } from "../../actions/posts";

function GroupSuggestion() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.groupShareModal);
  const options = useSelector((state) => state.group.groupSuggestions);
  const currentGroup = useSelector((state) => state.currentGroup.details);
  const currentId = useSelector((state) => state.selectedId);
  const handleClose = () => {
    dispatch({ type: CLOSE_GROUP_SHARE_MODAL });
    dispatch({ type: CLEAR_SELECTED_POST });
  };
  const handleClick = (id) => {
    dispatch(shareToGroup(currentId, id, currentGroup ? true : false));
  };
  return (
    open && (
      <CommonModal open={open} handleClose={handleClose}>
        <Typography component="h2" variant="h6" id="transition-modal-title">
          Send this post to your other Groups
        </Typography>
        {options?.length > 0 ? (
          <List dense={true} sx={{ width: "100%" }}>
            {options?.map((op) => (
              <ListItem
                key={op._id}
                onClick={() => handleClick(op._id)}
                sx={{ cursor: "pointer" }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={op?.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography sx={{ textAlign: "center" }}>
            You have no group where you can share the post
          </Typography>
        )}
      </CommonModal>
    )
  );
}

export default GroupSuggestion;
