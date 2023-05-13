import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Stack,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Tooltip,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { tranferownership } from "../../actions/groups";

function GroupDetails({ handleClose, groupDetails, handleExit, setRename }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth.authData);
  const [isCreator, setIsCreator] = useState(
    user.data._id === groupDetails?.creator._id
  );
  const handleEdit = () => {
    setRename(true);
  };
  const handleAdd = () => {
    setRename(false);
  };
  const handleKick = () => {};
  const handleOwnerShip = (id) => {
    dispatch(tranferownership(groupDetails._id, id));
  };
  return (
    <div style={{ marginTop: "70px", width: 400, padding: 10 }}>
      <div>
        <Button
          sx={{ padding: 0, minWidth: "auto" }}
          onClick={handleClose}
          color="secondary"
        >
          <CloseIcon />
        </Button>
      </div>

      <Box sx={{ width: "100%", marginTop: 2 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ display: "inline" }}
          >
            {groupDetails.name}
          </Typography>
          {isCreator && (
            <Button variant="text" color="secondary" onClick={handleEdit}>
              <EditIcon />
            </Button>
          )}
        </Box>

        <Stack spacing={1}>
          <List sx={{ bgcolor: "background.paper", width: "100%" }}>
            <ListItem>
              <ListItemText
                primary={`Created At: ${new Date(
                  groupDetails.createdAt
                ).toLocaleDateString()}`}
              />
            </ListItem>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ display: "inline" }}
                ml={2}
              >
                MEMBERS:{groupDetails.members.length}
              </Typography>
              {isCreator && (
                <Button variant="text" color="secondary" onClick={handleAdd}>
                  <AddIcon />
                </Button>
              )}
            </Box>
            <MemberDetails member={groupDetails.creator} />
            {groupDetails.members.map((member) => (
              <MemberDetails
                key={member._id}
                member={member}
                show={isCreator}
                handleOwnerShip={() => handleOwnerShip(member._id)}
                handleKick={handleKick}
              />
            ))}
          </List>

          <Tooltip title="exit" arrow>
            <Button variant="contained" color="error" onClick={handleExit}>
              <Typography>Leave Group</Typography>
              <ExitToAppIcon />
            </Button>
          </Tooltip>
          {isCreator && (
            <Tooltip title="delete this group" arrow>
              <Button variant="contained" color="error" onClick={handleExit}>
                <Typography>Delete Group</Typography>
                <DeleteIcon />
              </Button>
            </Tooltip>
          )}
        </Stack>
      </Box>
    </div>
  );
}

export default GroupDetails;

const MemberDetails = ({ member, show, handleKick, handleOwnerShip }) => {
  const user = useSelector((state) => state.userAuth.authData);
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          sx={{
            bgcolor: deepOrange[500],
          }}
        >
          {member.name[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={member._id === user._id ? `${member.name} (You)` : null}
        secondary={<>{member.email}</>}
      />
      {show && (
        <>
          <Tooltip title="make admin" arrow>
            <Button variant="text" color="success" onClick={handleOwnerShip}>
              <PublishedWithChangesIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Kick the member" arrow>
            <Button variant="text" color="error" onClick={handleKick}>
              <RemoveCircleOutlineIcon />
            </Button>
          </Tooltip>
        </>
      )}
    </ListItem>
  );
};
