import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Path from "../Groups/Path";
import { CircularProgress, Divider, Drawer } from "@mui/material";
import GroupDetails from "./../Groups/GroupDetails";
import { SELECTED_GROUP, CURRENT_GROUP_LOADING } from "../../actions/action";
import { groupDetails } from "../../actions/groups";

function GroupDetail() {
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentGroupId = useSelector((state) => state.selectedGroup);
  const { details: currentGroupDetails, loading } = useSelector(
    (state) => state.currentGroup
  );

  const toggleDrawer = (open) => {
    setDrawer(open);
  };
  useEffect(() => {
    console.log(id);
    dispatch({ type: CURRENT_GROUP_LOADING });
    dispatch({ type: SELECTED_GROUP, payload: id });
    dispatch(groupDetails(currentGroupId));
  }, [dispatch, id, currentGroupId]);
  return (
    <div style={{ marginTop: "80px" }}>
      <Path
        currentGroup={currentGroupDetails}
        handleOpen={() => toggleDrawer(true)}
      />
      <Divider />
      {loading ? <CircularProgress /> : <h1>POSTS</h1>}

      <Drawer
        anchor="right"
        open={drawer}
        onClose={() => toggleDrawer(false)}
        hideBackdrop={true}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <GroupDetails
            handleClose={() => toggleDrawer(false)}
            groupDetails={currentGroupDetails}
          />
        )}
      </Drawer>
    </div>
  );
}

export default GroupDetail;
