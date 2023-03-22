import { FC, useState } from "react";

import dashify from "dashify";

import axios from "axios";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField } from "@mui/material";

interface IPost {
  title: string;
  body: string;
}

const defaultValues: IPost = {
  title: "",
  body: "",
};

const Post: FC = () => {
  const PostSchema = yup.object().shape({
    title: yup.string().required("Please fill this out"),
    body: yup.string().required("Please fill this out"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPost>({
    mode: "onChange",
    resolver: yupResolver(PostSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: IPost) => {
    console.log(data);
    const { title, body } = data;
    await axios.post("/api/entry", { title, slug: dashify(title), body });
  };

  return (
    <Grid container>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField fullWidth label="Title" id="title" {...register("title")} />

        <TextField
          fullWidth
          label="Content"
          id="content"
          {...register("body")}
        />

        <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </Box>
    </Grid>
  );
};

export default Post;
