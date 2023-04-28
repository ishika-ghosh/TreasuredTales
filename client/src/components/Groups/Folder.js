import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ImageListItem, Typography, Checkbox } from "@mui/material";
import folder from "./folder.png";
import { SELECTED_GROUP, CLEAR_SELECTED_GROUP } from "./../../actions/action";

function Folder({ id, name }) {
  const [background, setBackground] = useState("#edeff0");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (id) => {
    if (checked) {
      setChecked(false);
      setBackground("#edeff0");
      dispatch({ type: CLEAR_SELECTED_GROUP, payload: null });
    } else {
      setChecked(true);
      setBackground("#cde2f7");
      dispatch({ type: SELECTED_GROUP, payload: id });
    }
  };

  return (
    <ImageListItem key={id} sx={{ padding: 2 }}>
      <div
        style={{
          height: "15rem",
          width: "100%",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: background,
          padding: "10px",
          textAlign: "center",
        }}
        onClick={() => handleClick(id)}
        onDoubleClick={() => navigate(`${id}`)}
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
          <Checkbox checked={checked} onChange={() => handleClick(id)} />
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
