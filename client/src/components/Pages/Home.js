import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import AddImage from "../Forms/AddImage";

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
    </div>
  );
}

export default Home;
