import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
function Path({ currentGroup }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: "15px",
        display: "flex",
        alignItems: "center",
        marginLeft: "20px",
      }}
    >
      <span style={styles.span} onClick={() => navigate("/")}>
        Memories
      </span>
      <ArrowForwardIosIcon sx={styles.arrow} />
      <span style={styles.span} onClick={() => navigate("/groups")}>
        Groups
      </span>

      {currentGroup && (
        <>
          <ArrowForwardIosIcon />
          <span>{currentGroup}</span>
        </>
      )}
    </div>
  );
}

export default Path;
const styles = {
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
