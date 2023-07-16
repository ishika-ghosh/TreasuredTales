import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ImageList } from "@mui/material";
import { CircularProgress } from "@mui/material";
import Folder from "./Folder";
import EmptySpace from "../common/EmptySpace";
// import FolderSharedIcon from "@mui/icons-material/FolderShared";

function Groups({ isloading, setCols }) {
  const groups = useSelector((state) => state.group.groups);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", window);
    };
  }, [width]);
  const setCol = () => {
    if (width < 1300 && width > 900) {
      return 3;
    } else if (width > 700 && width < 900) {
      return 2;
    } else if (width < 700) {
      return 1;
    } else {
      return 5;
    }
  };

  return !isloading ? (
    groups.length > 0 ? (
      <div style={{ padding: "20px" }}>
        <ImageList cols={setCol()} gap={5}>
          {groups.map((group, ind) => (
            <Folder id={group._id} key={ind} name={group.name} />
          ))}
        </ImageList>
      </div>
    ) : (
      <EmptySpace signup={false} />
    )
  ) : (
    <CircularProgress />
  );
}

export default Groups;
