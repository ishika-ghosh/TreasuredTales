import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Share from "../Share/Share";
import AddPost from "../AddImage/AddPost";

function Home({ isloading, setIsloading }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth.authData);
  const posts = useSelector((state) => state.posts.posts);
  useEffect(() => {
    if (user) {
      dispatch(fetchPosts(setIsloading));
    }
  }, [dispatch, user, setIsloading]);
  return (
    <div style={{ marginTop: "80px" }}>
      <AddPost />
      <Posts
        isloading={isloading}
        posts={posts}
        sharedPosts={false}
        groupPosts={false}
      />
      <Share />
    </div>
  );
}

export default Home;
