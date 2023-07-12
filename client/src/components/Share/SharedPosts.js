import React from "react";
import { CircularProgress, Divider } from "@mui/material";
import SortButton from "./SortButton";
import { useSelector } from "react-redux";
import Posts from "../Posts/Posts";

function SharedPosts({ currentPosts }) {
  const { loading: sharedPostLoading, posts: sharedPosts } = useSelector(
    (state) => state.sharedPosts
  );

  return (
    <div>
      <Divider />
      <SortButton currentPosts={currentPosts} />
      <Divider />
      {sharedPostLoading ? (
        <CircularProgress />
      ) : (
        <Posts
          isloading={sharedPostLoading}
          posts={sharedPosts}
          sharedPosts={true}
          groupPosts={false}
        />
      )}
    </div>
  );
}

export default SharedPosts;
