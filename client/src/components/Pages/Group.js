import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGroups } from "../../actions/groups";
import CreateGroup from "../Groups/CreateGroup";
import Groups from "../Groups/Groups";
import Path from "../Groups/Path";
import { Divider } from "@mui/material";

export default function Group({ user, isloading, setIsloading }) {
  const modalState = useSelector((state) => state.modal.group);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchAllGroups(setIsloading));
    }
  }, [dispatch, setIsloading, user]);
  return (
    user && (
      <div style={{ marginTop: "80px" }}>
        <Path />
        <Divider />
        <CreateGroup open={modalState} />
        <Groups isloading={isloading} />
      </div>
    )
  );
}
