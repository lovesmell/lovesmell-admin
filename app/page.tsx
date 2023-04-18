"use client";

import { FC, useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import AuthRoute from "@lovesmell/HOC/authRoute";
import getPosts from "@lovesmell/utils/db/getPosts";
import deletePost from "@lovesmell/utils/db/deletePost";

const DashBoard: FC = () => {
  const router = useRouter();

  const [checked, setChecked] = useState([0]);
  const [posts, setPosts] = useState<GridRowsProp>([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<GridRowId>("");
  const [loading, setLoading] = useState<boolean>(true);

  const handleEditClick = (id: GridRowId) => () => {
    router.push(`/post?id=${id}`);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    handleClose();

    try {
      const { error } = await deletePost("posts", deleteId as string);

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
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: ({ row: { title, id } }: GridRenderCellParams) => (
        <NextLink href={`/post?id=${id}`}>{title}</NextLink>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key="preview"
            icon={<VisibilityIcon />}
            label="Preview"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
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
      setLoading(true);
      const { error, result } = await getPosts("posts");
      setPosts(result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AuthRoute>
      <>
        <Paper elevation={10} sx={{ padding: 3, margin: "auto" }}>
          <Typography variant="h4">Dashboard</Typography>

          <Box sx={{ height: "auto", overflow: "auto" }}>
            <DataGrid
              checkboxSelection
              disableRowSelectionOnClick
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              autoHeight
              loading={loading}
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
              sx={{
                "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": {
                  outline: "none !important",
                },

                "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                  outline: "none !important",
                },
              }}
            />
          </Box>
        </Paper>

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Never Mind
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </AuthRoute>
  );
};

export default DashBoard;
