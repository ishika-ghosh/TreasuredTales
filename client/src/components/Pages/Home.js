import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Share from "../Share/Share";
import Post from "../AddImage/Post";

function Home({ isloading, user, setIsloading }) {
  const modalState = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchPosts(setIsloading));
    }
  }, [dispatch, user, setIsloading]);
  return (
    <div>
      <Post open={modalState} />
      <Posts isloading={isloading} />
      <Share />
    </div>
  );
}

export default Home;
