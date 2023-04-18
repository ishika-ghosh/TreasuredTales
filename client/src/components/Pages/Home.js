import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../actions/posts";
import SnackBar from "../common/SnackBar";
import Posts from "../Posts/Posts";
import Share from "../Share/Share";
import AddImage from "./../AddImage/AddImage";

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
      <AddImage open={modalState} />
      <Posts isloading={isloading} />
      <Share />
      <SnackBar />
    </div>
  );
}

export default Home;
