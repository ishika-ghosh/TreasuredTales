import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Box, Button, Grid } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import Input from "../common/Input";
import { createNewGroup } from "../../actions/groups";
import { GROUP_ERROR, GROUP_LOADING } from "../../actions/action";
import { API } from "../../api";
import Search from "../common/Search";

function GroupForm() {
  const user = useSelector((state) => state.userAuth.authData);
  const err = useSelector((state) => state.group.error);
  const dispatch = useDispatch();
  const [groupData, setGroupData] = useState({
    name: "",
    description: "",
    members: [],
  });
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // const [alert, setAlert] = useState({ msg: null, ind: null });
  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };
  const handleAutoCompleteValue = (_, v) => {
    setGroupData({ ...groupData, members: v });
  };
  const handleInputChange = (_, v) => setInputValue(v);
  useEffect(() => {
    const func = async () => {
      const { data } = await API.get(`/search/members?q=${inputValue}`);
      setOptions(data);
      console.log(options);
    };
    func();
  }, [inputValue]);

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
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            label="Description"
            name="description"
            value={groupData.description}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Search
            options={options}
            values={groupData.members}
            inputValue={inputValue}
            handleChange={handleAutoCompleteValue}
            handleInputChange={handleInputChange}
            optionKey="email"
          />
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
