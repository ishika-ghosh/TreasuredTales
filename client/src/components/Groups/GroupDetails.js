import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DialogBox from "../common/DialogBox";
import Input from "./../common/Input";
import {
  addMembers,
  deleteGroupWithAllMemories,
  exitGroup,
  groupRename,
  kickFromGroup,
} from "../../actions/groups";
import UserList from "../common/UserList";
import { API } from "../../api";

function GroupDetails({ handleClose, groupDetails }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userAuth.authData);
  const [isCreator, setIsCreator] = useState(
    user.data._id === groupDetails?.creator._id
  );
  const [rename, setRename] = useState({
    state: false,
    name: groupDetails.name,
  });
  const [add, setAdd] = useState({ state: false, inputValue: "" });
  const [options, setOptions] = useState([]);
  const [dialogDetails, setDialogDetails] = useState({
    q: 1,
    open: false,
    message: "",
    heading: "",
  });
  const handleRename = () => {
    dispatch(groupRename(groupDetails._id, rename.name));
    setRename({ ...rename, state: false });
  };
  const handleAdd = (memberId) => {
    dispatch(addMembers(groupDetails._id, memberId));
  };
  const handleKick = (id) => {
    dispatch(kickFromGroup(groupDetails._id, id));
  };
  const handleExitGroup = () => {
    if (dialogDetails.q) {
      dispatch(exitGroup(groupDetails._id, user.data._id));
    } else {
      dispatch(deleteGroupWithAllMemories(groupDetails._id));
    }
    setDialogDetails({ ...dialogDetails, open: false });
    navigate("/groups");
  };
  useEffect(() => {
    const func = async () => {
      const { data } = await API.get(`/search/members?q=${add.inputValue}`);
      setOptions(data);
    };
    if (add.inputValue === "") {
      return;
    }
    try {
      func();
    } catch (error) {
      console.log(error);
    }
  }, [add.inputValue]);
  return (
    <>
      <DialogBox
        handleClose={() => setDialogDetails({ ...dialogDetails, open: false })}
        open={dialogDetails.open}
        heading={dialogDetails.heading}
        message={dialogDetails.message}
        handleFunction={handleExitGroup}
      />
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
            {rename.state ? (
              <Stack spacing={1}>
                <Input
                  value={rename.name}
                  handleChange={(e) =>
                    setRename({ ...rename, name: e.target.value })
                  }
                />
                <Button fullWidth variant="contained" onClick={handleRename}>
                  rename Group
                </Button>
              </Stack>
            ) : (
              <>
                <Typography
                  variant="h6"
                  textAlign="center"
                  sx={{ display: "inline" }}
                >
                  {groupDetails.name}
                </Typography>
                {isCreator && (
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => setRename({ ...rename, state: true })}
                  >
                    <EditIcon />
                  </Button>
                )}
              </>
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
                  MEMBERS:{groupDetails.members.length + 1}
                </Typography>
                {isCreator && (
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={() => setAdd({ ...add, state: true })}
                  >
                    <AddIcon />
                  </Button>
                )}
              </Box>
              {add.state && (
                <Box>
                  <Input
                    value={add.inputValue}
                    handleChange={(e) =>
                      setAdd({ ...add, inputValue: e.target.value })
                    }
                  />
                  <List>
                    {options.map((option, i) => (
                      <UserList
                        option={option}
                        handleMembers={() => handleAdd(option._id)}
                      />
                    ))}
                  </List>
                </Box>
              )}
              <MemberDetails
                member={groupDetails.creator}
                name={`${groupDetails.creator.name} (Admin)`}
              />
              {groupDetails.members.map((member) => (
                <MemberDetails
                  key={member._id}
                  member={member}
                  show={isCreator}
                  handleKick={handleKick}
                  name={
                    member._id === user.data._id
                      ? `${member.name} (You)`
                      : `${member.name}`
                  }
                />
              ))}
            </List>

            <Tooltip title="exit" arrow>
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  setDialogDetails({
                    q: 1,
                    message:
                      "After leaving the group you will not be able to see any post of this group",
                    heading: "Are you sure you want to leave the group?",
                    open: true,
                  })
                }
              >
                <Typography>Leave Group</Typography>
                <ExitToAppIcon />
              </Button>
            </Tooltip>
            {isCreator && (
              <Tooltip title="delete this group" arrow>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() =>
                    setDialogDetails({
                      q: 0,
                      message:
                        "After deleting the group you will not be able to see any post of this group",
                      heading: "Are you sure you want to delete the group?",
                      open: true,
                    })
                  }
                >
                  <Typography>Delete Group</Typography>
                  <DeleteIcon />
                </Button>
              </Tooltip>
            )}
          </Stack>
        </Box>
      </div>
    </>
  );
}

export default GroupDetails;

const MemberDetails = ({ member, show, handleKick, name }) => {
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
      <ListItemText primary={name} secondary={<>{member.email}</>} />
      {show && (
        <>
          <Tooltip title="Kick the member" arrow>
            <Button
              variant="text"
              color="error"
              onClick={() => handleKick(member._id)}
            >
              <RemoveCircleOutlineIcon />
            </Button>
          </Tooltip>
        </>
      )}
    </ListItem>
  );
};
