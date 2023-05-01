import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Box, Button, Grid, List, Chip } from "@mui/material";
import { createNewGroup } from "../../actions/groups";
import { GROUP_LOADING } from "../../actions/action";
import { API } from "../../api";
import Input from "../common/Input";
import UserList from "../common/UserList";

function GroupForm() {
  const err = useSelector((state) => state.group.error);
  const dispatch = useDispatch();
  const [groupData, setGroupData] = useState({
    name: "",
    members: [],
  });
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setIsloading] = useState(false);
  useEffect(() => {
    const func = async () => {
      setIsloading(true);
      const { data } = await API.get(`/search/members?q=${inputValue}`);
      setOptions(data);
      setIsloading(false);
    };
    if (inputValue === "") {
      return;
    }
    try {
      console.log(inputValue);
      func();
    } catch (error) {
      console.log(error);
    }
  }, [inputValue]);

  const handleMembers = (user) => {
    if (groupData.members.includes(user)) {
      return;
    }
    setGroupData({ ...groupData, members: [...groupData.members, user] });
    setInputValue("");
  };
  const handleDelete = (member) => {
    setGroupData({
      ...groupData,
      members: groupData.members.filter((m) => m._id !== member._id),
    });
  };
  const handleSubmit = () => {
    console.log(groupData);
    dispatch({ type: GROUP_LOADING });
    dispatch(createNewGroup(groupData));
  };
  return (
    <Box sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            label="Group Name"
            name="name"
            value={groupData.name}
            handleChange={(e) =>
              setGroupData({ ...groupData, name: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            maxHeight={100}
            overflow={"scroll"}
            sx={{
              overflowX: "hidden",
              paddingY: "5px",
              paddingLeft: "10px",
              borderRadius: "3px",
            }}
          >
            {groupData.members.map((member) => (
              <Chip
                label={member.email}
                variant="outlined"
                color="secondary"
                onDelete={() => handleDelete(member)}
                key={member._id}
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Input
            label="Add members to this group"
            name="members"
            value={inputValue}
            handleChange={(e) => setInputValue(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <>
            <Box
              maxHeight={150}
              overflow={"scroll"}
              sx={{ overflowX: "hidden" }}
            >
              {loading ? (
                <span>loading..</span>
              ) : (
                <>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                    }}
                  >
                    {options.map((option) => (
                      <UserList
                        option={option}
                        key={option._id}
                        handleMembers={() => handleMembers(option)}
                      />
                    ))}
                  </List>
                </>
              )}
            </Box>
          </>
        </Grid>
        <Grid item xs={12}>
          {err && <Alert security="error">{err}</Alert>}
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={err !== null}
          >
            Create Group
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GroupForm;
