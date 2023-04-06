"use client";

import { FC, useEffect, useState } from "react";
import NextLink from "next/link";

import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import AuthRoute from "@lovesmell/HOC/authRoute";
import getPosts from "@lovesmell/utils/db/getPosts";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const columns: GridColDef[] = [
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
];

const rows: GridRowsProp = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

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
      <Paper elevation={10} sx={{ padding: 3, margin: "auto" }}>
        <Typography variant="h4">Dashboard</Typography>

        <Box sx={{ height: 600 }}>
          <DataGrid
            checkboxSelection
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            pageSizeOptions={[10, 25, 50]}
            rows={rows}
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
