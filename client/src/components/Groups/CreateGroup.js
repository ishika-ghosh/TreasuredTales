import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, CircularProgress } from "@mui/material";
import AddButton from "./../common/AddButton";
import CommonModal from "./../common/CommonModal";
import GroupForm from "../Forms/GroupForm";
import { API } from "../../api";
import { createNewGroup } from "../../actions/groups";
import {
  OPEN_GROUP_MODAL,
  CLOSE_GROUP_MODAL,
  CLEAR_SELECTED_GROUP,
  GROUP_LOADING,
} from "../../actions/action";

function CreateGroup() {
  const loading = useSelector((state) => state.group.loading);
  const groupModal = useSelector((state) => state.modal.groupModal);
  const err = useSelector((state) => state.group.error);
  const [groupData, setGroupData] = useState({
    name: "",
    members: [],
  });
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [optionLoading, setOptionLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const func = async () => {
      setOptionLoading(true);
      const { data } = await API.get(`/search/members?q=${inputValue}`);
      setOptions(data);
      setOptionLoading(false);
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
  const handleGroupModalOpen = () => {
    dispatch({ type: OPEN_GROUP_MODAL });
  };
  const handleGroupModalClose = () => {
    dispatch({ type: CLOSE_GROUP_MODAL });
    dispatch({ type: CLEAR_SELECTED_GROUP });
  };

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
  const handleChange = (e) => {
    setGroupData({ ...groupData, name: e.target.value });
  };
  const handleInputValue = (s) => setInputValue(s);
  return (
    <>
      <AddButton title="New Group" handleOpen={handleGroupModalOpen} />
      <CommonModal open={groupModal} handleClose={handleGroupModalClose}>
        <Typography component="h1" variant="h5" id="transition-modal-title">
          Creating Group
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <GroupForm
            groupData={groupData}
            options={options}
            loading={optionLoading}
            handleMembers={handleMembers}
            handleChange={handleChange}
            handleDelete={handleDelete}
            handleInputValue={handleInputValue}
            handleSubmit={handleSubmit}
            error={err}
          />
        )}
      </CommonModal>
    </>
  );
}

export default CreateGroup;
