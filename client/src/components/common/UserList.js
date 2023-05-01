import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";

function UserList({ option, handleMembers }) {
  return (
    <ListItemButton
      alignItems="flex-start"
      onClick={handleMembers}
      sx={{
        borderRadius: 5,
        bgcolor: "#eeebf0",
        marginBottom: "10px",
        padding: 1,
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            bgcolor: deepOrange[500],
          }}
        >
          {option.name[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={option.name}
        secondary={
          <>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Email:
            </Typography>
            {option.email}
          </>
        }
      />
    </ListItemButton>
  );
}

export default UserList;
