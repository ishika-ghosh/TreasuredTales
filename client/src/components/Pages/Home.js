import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../actions/posts";
import SnackBar from "../common/SnackBar";
import Posts from "../Posts/Posts";
import Share from "../Share/Share";
import AddImage from "./../AddImage/AddImage";

function Home() {
  const user = useSelector((state) => state.userAuth.authData);
  const [isloading, setIsloading] = useState(true);
  const modalState = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchPosts(setIsloading));
    }
  }, [dispatch, user]);
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
