import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CircularProgress, Divider, Drawer } from "@mui/material";
import {
  SELECTED_GROUP,
  CURRENT_GROUP_LOADING,
  GROUP_POST_LOADING,
} from "../../actions/action";
import { groupDetails } from "../../actions/groups";
import GroupDetails from "./../Groups/GroupDetails";
import Path from "../Groups/Path";
import GroupPosts from "../Groups/GroupPosts";
import { getAllGroupPosts } from "../../actions/posts";

function GroupDetail() {
  const { id } = useParams();
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch();
  const currentGroupId = useSelector((state) => state.selectedGroup);
  const {
    details: currentGroupDetails,
    loading,
    postLoading,
  } = useSelector((state) => state.currentGroup);

  const toggleDrawer = (open) => {
    setDrawer(open);
  };
  useEffect(() => {
    console.log(id);
    dispatch({ type: CURRENT_GROUP_LOADING });
    dispatch({ type: GROUP_POST_LOADING });
    dispatch({ type: SELECTED_GROUP, payload: id });
    dispatch(groupDetails(currentGroupId));
    dispatch(getAllGroupPosts(currentGroupId));
  }, [dispatch, id, currentGroupId]);

  return (
    <div style={{ marginTop: "80px" }}>
      <Path
        currentGroup={currentGroupDetails}
        handleOpen={() => toggleDrawer(true)}
      />
      <Divider />
      {postLoading ? <CircularProgress /> : <GroupPosts />}

      <Drawer
        anchor="right"
        open={drawer}
        onClose={() => toggleDrawer(false)}
        hideBackdrop={true}
      >
        {loading ? (
          <div
            style={{
              marginTop: "70px",
              width: 400,
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress />
          </div>
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
