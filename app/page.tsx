"use client";

import { FC, useEffect, useState } from "react";
import NextLink from "next/link";

import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import AuthRoute from "@lovesmell/HOC/authRoute";
import getPosts from "@lovesmell/utils/db/getPosts";

const DashBoard: FC = () => {
  const [checked, setChecked] = useState([0]);
  const [posts, setPosts] = useState<any>([]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { error, result } = await getPosts("posts");
        setPosts(result);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthRoute>
      <Paper elevation={10} sx={{ padding: 1, margin: "auto" }}>
        <List>
          {posts?.map((entry: any) => {
            const { id, title } = entry;
            const labelId = `checkbox-list-label-${id}`;

            return (
              <ListItem
                key={id}
                secondaryAction={
                  <>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>

                    <IconButton aria-label="delete" sx={{ ml: 1 }}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
                disablePadding
              >
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                      onChange={handleToggle(id)}
                    />
                  </ListItemIcon>
                  <Link href={`/post/${id}`} component={NextLink}>
                    <Typography>{title}</Typography>
                  </Link>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </AuthRoute>
  );
};

export default DashBoard;
