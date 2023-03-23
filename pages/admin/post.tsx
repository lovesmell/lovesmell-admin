import { FC, useState } from "react";
import dynamic from "next/dynamic";

import dashify from "dashify";

import axios from "axios";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

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
    control,
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
    <Grid container spacing={3} flexDirection="column" alignItems="center">
      <Grid item xs={12} sm={6}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                fullWidth
                id="title"
                label="Title"
                error={Boolean(errors.title)}
                helperText={errors.title && "Title is required"}
              />
            );
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Controller
          name="body"
          control={control}
          render={({ field }) => {
            return (
              <QuillNoSSRWrapper
                {...field}
                modules={modules}
                formats={formats}
                theme="snow"
              />
            );
          }}
        />
      </Grid>

      <Grid item>
        <Button
          id="submit"
          color="primary"
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Add Post
        </Button>
      </Grid>
    </Grid>
  );
};

export default Post;
