import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGroups } from "../../actions/groups";
import CreateGroup from "../Groups/CreateGroup";
import Groups from "../Groups/Groups";
import { Divider } from "@mui/material";

export default function Group({ isloading, setIsloading }) {
  const user = useSelector((state) => state.userAuth.authData);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchAllGroups(setIsloading));
    }
  }, [dispatch, setIsloading, user]);

  return (
    user && (
      <div style={{ marginTop: "80px" }}>
        <Divider />
        <CreateGroup />
        <Groups isloading={isloading} />
      </div>
    )
  );
}
