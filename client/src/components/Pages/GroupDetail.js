import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Path from "../Groups/Path";
import { Divider, Drawer } from "@mui/material";
import GroupDetails from "./../Groups/GroupDetails";

function GroupDetail() {
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch();
  const currentGroupId = useSelector((state) => state.selectedGroup);
  const currentGroup = useSelector((state) =>
    currentGroupId
      ? state.group.groups.find((group) => group._id === currentGroupId)
      : null
  );

  const toggleDrawer = (open) => {
    setDrawer(open);
  };
  return (
    <div style={{ marginTop: "80px" }}>
      <Path currentGroup={currentGroup} handleOpen={() => toggleDrawer(true)} />
      <Divider />
      POSTS
      <Drawer
        anchor="right"
        open={drawer}
        onClose={() => toggleDrawer(false)}
        hideBackdrop={true}
      >
        <GroupDetails
          handleClose={() => toggleDrawer(false)}
          groupDetails={currentGroup}
        />
      </Drawer>
    </div>
  );
}

export default GroupDetail;
