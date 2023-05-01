import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Share from "../Share/Share";
import AddPost from "../AddImage/AddPost";

function Home({ isloading, user, setIsloading }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchPosts(setIsloading));
    }
  }, [dispatch, user, setIsloading]);
  return (
    <div>
      <AddPost />
      <Posts isloading={isloading} />
      <Share />
    </div>
  );
}

export default Home;
