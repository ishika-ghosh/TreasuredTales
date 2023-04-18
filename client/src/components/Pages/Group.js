import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllGroups } from "../../actions/groups";

export default function Group({ user, isloading, setIsloading }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchAllGroups(setIsloading));
    }
  }, [dispatch, setIsloading, user]);
  return <div>Group</div>;
}
