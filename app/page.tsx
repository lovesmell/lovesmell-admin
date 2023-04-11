"use client";

import { FC, useEffect, useState } from "react";
import NextLink from "next/link";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import AuthRoute from "@lovesmell/HOC/authRoute";
import getPosts from "@lovesmell/utils/db/getPosts";
import deletePost from "@lovesmell/utils/db/deletePost";

const DashBoard: FC = () => {
  const [checked, setChecked] = useState([0]);
  const [posts, setPosts] = useState<GridRowsProp>([]);

  const handleEditClick = (id: GridRowId) => () => {};

  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      const { error } = await deletePost("posts", id as string);

      if (error) {
        console.log(error);
        return;
      }

      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

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

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const fetchData = async () => {
    try {
      const { error, result } = await getPosts("posts");
      setPosts(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AuthRoute>
      <Paper elevation={10} sx={{ padding: 3, margin: "auto" }}>
        <Typography variant="h4">Dashboard</Typography>

        <Box sx={{ height: 250, maxHeight: 600 }}>
          <DataGrid
            checkboxSelection
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            pageSizeOptions={[10, 25, 50]}
            rows={posts}
            columns={columns}
            slots={{
              toolbar: GridToolbar,
              noRowsOverlay: () => (
                <Stack
                  sx={{
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  There is no posts
                </Stack>
              ),
            }}
            slotProps={{
              toolbar: {
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
          />
        </Box>
      </Paper>
    </AuthRoute>
  );
};

export default DashBoard;
