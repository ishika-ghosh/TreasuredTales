import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CLEAR_SELECTED_GROUP } from "../../actions/action";
import { Box, Button, Tooltip } from "@mui/material";
function Path({ currentGroup, handleOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div style={styles.div}>
      <Box height="100%" sx={styles.box}>
        <Tooltip title="Home" arrow>
          <span
            style={styles.span}
            onClick={() => {
              navigate("/");
              dispatch({ type: CLEAR_SELECTED_GROUP });
            }}
          >
            Memories
          </span>
        </Tooltip>
        <ArrowForwardIosIcon sx={styles.arrow} />
        <Tooltip title="Groups" arrow>
          <span
            style={styles.span}
            onClick={() => {
              navigate("/groups");
              dispatch({ type: CLEAR_SELECTED_GROUP });
            }}
          >
            Groups
          </span>
        </Tooltip>

        {currentGroup && (
          <>
            <ArrowForwardIosIcon style={styles.arrow} />
            <Tooltip title={currentGroup.name} arrow>
              <span style={styles.span}>{currentGroup.name}</span>
            </Tooltip>
          </>
        )}
      </Box>
      <Box>
        {currentGroup && <Button onClick={handleOpen}>Group Details</Button>}
      </Box>
    </div>
  );
}

export default Path;
const styles = {
  div: {
    padding: "15px",
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
    justifyContent: "space-between",
  },
  box: { display: "flex", alignItems: "center" },
  span: {
    fontSize: "20px",
    color: "#868687",
    marginRight: "10px",
    cursor: "pointer",
  },
  arrow: {
    color: "#656566",
    marginRight: "10px",
  },
};
