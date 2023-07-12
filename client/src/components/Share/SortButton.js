import React from "react";
import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { Button, Menu, MenuItem, Box, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import {
//   FETCH_SHARE_POST_LOADING,
//   FETCH_SHARE_POST,
// } from "../../actions/action";

function SortButton({ currentPosts }) {
  // const posts = useSelector((state) => state.sharedPosts.posts);
  // const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id) => {
    setAnchorEl(null);
    // dispatch({ type: FETCH_SHARE_POST_LOADING });
    // let newPosts;
    // if (id === 1) {
    //   newPosts = posts.sort((a, b) => {
    //     var x = a["title"],
    //       y = b["title"];
    //     return x < y ? -1 : x > y ? 1 : 0;
    //   });
    // }
    // dispatch({ type: FETCH_SHARE_POST, payload: newPosts });
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: { md: "30%", xs: "20%" },
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5">{currentPosts}</Typography>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Sort By {open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose(1)}>Name</MenuItem>
        <MenuItem onClick={() => handleClose(2)}>Latest on top</MenuItem>
        <MenuItem onClick={() => handleClose(3)}>Oldest on top</MenuItem>
      </Menu>
    </Box>
  );
}

export default SortButton;
