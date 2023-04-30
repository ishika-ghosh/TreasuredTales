import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../common/Input";
import { Alert, Box, Button, Grid } from "@mui/material";
import { createNewGroup } from "../../actions/groups";
import { GROUP_LOADING } from "../../actions/action";
import { API } from "../../api";

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
  // const handleAutoCompleteValue = (_, v) => {
  //   setGroupData({ ...groupData, members: v });
  // };
  // const handleInputChange = (_, v) => setInputValue(v);
  useEffect(() => {
    const func = async () => {
      const { data } = await API.get(`/search/members?q=${inputValue}`);
      setOptions(data);
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

        <Grid item xs={12}></Grid>
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
