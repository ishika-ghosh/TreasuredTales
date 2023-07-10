import { useSelector } from "react-redux";
import CommonModal from "./CommonModal";

import "./style.css";

function Profile({ open, handleProfile }) {
  const user = useSelector((state) => state.userAuth.authData?.data);
  return (
    <CommonModal open={open} handleClose={handleProfile}>
      <div className="card">
        <div className="card__border">
          <div className="card__img">{user?.name[0]}</div>
        </div>

        <h3 className="card__name">{user?.name}</h3>
        <span className="card__profession">{user?.email}</span>
      </div>
    </CommonModal>
  );
}

export default Profile;
