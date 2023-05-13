import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ImageListItem, Typography } from "@mui/material";
import folder from "./folder.png";
import { SELECTED_GROUP } from "../../actions/action";

function Folder({ id, name }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch({ type: SELECTED_GROUP, payload: id });
    navigate(`${id}`);
  };

  return (
    <ImageListItem key={id} sx={{ padding: 2 }}>
      <div
        style={{
          height: "15rem",
          width: "100%",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: "#edeff0",
          padding: "10px",
          textAlign: "center",
        }}
        onClick={() => handleClick(id)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "10px",
          }}
        >
          <Typography variant="h6" color="#656566">
            {name}
          </Typography>
        </div>
        <div
          style={{
            height: "70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            backgroundColor: "white",
          }}
        >
          <img
            src={folder}
            alt="folder"
            style={{ height: "80%", width: "50%" }}
          />
        </div>
      </div>
    </ImageListItem>
  );
}

export default Folder;
