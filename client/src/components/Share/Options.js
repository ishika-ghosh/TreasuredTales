import { useState } from "react";
import {
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";

export default function Options() {
  const [open, setOpen] = useState(true);
  const [option, setOption] = useState("ALL");
  const [listOpen, setListOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleChange = (name) => {
    handleClick();
    setOption(name);
  };

  return (
    <List
      sx={{ width: "100%", marginTop: 8, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Typography sx={{ display: { xs: "none", md: "inline" } }}>
            Shared With You
          </Typography>
          <ListItemButton
            onClick={() => setListOpen(!listOpen)}
            sx={{ width: "100%", display: { md: "none" } }}
          >
            <ListItemText primary="Shared With You" />
            {listOpen ? (
              <ExpandLess sx={{ display: { md: "none" } }} />
            ) : (
              <ExpandMore sx={{ display: { md: "none" } }} />
            )}
          </ListItemButton>
        </ListSubheader>
      }
    >
      <Collapse in={listOpen} timeout="auto">
        <ListItemButton>
          <ListItemIcon>
            <FavoriteBorderIcon />
          </ListItemIcon>
          <ListItemText primary="Favourites" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <DensitySmallIcon />
          </ListItemIcon>
          <ListItemText primary={option} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {option !== "ALL" && (
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => handleChange("ALL")}
              >
                <ListItemIcon>
                  <WallpaperIcon />
                </ListItemIcon>
                <ListItemText primary="ALL" />
              </ListItemButton>
            )}

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => handleChange("Editor Access")}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Editor Access" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => handleChange("Viewer Access")}
            >
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
              <ListItemText primary="Viewer Access" />
            </ListItemButton>
          </List>
        </Collapse>
      </Collapse>
    </List>
  );
}
