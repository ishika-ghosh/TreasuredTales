import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllGroups } from "../../actions/groups";
import CreateGroup from "../Groups/CreateGroup";
import Groups from "../Groups/Groups";
import Path from "../Groups/Path";
import { Divider } from "@mui/material";

export default function Group({ user, isloading, setIsloading }) {
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
        <CreateGroup />
        <Groups isloading={isloading} />
      </div>
    )
  );
}
