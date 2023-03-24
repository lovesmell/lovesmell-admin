import { FC } from "react";

import dashify from "dashify";

import axios from "axios";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Editor from "@lovesmell/components/Editor";

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
    <Box>
      <Box>
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
      </Box>

      <Box mt={2}>
        <Controller
          name="body"
          control={control}
          render={({ field }) => {
            return <Editor field={field} />;
          }}
        />
      </Box>

      <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          id="submit"
          color="primary"
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Add Post
        </Button>
      </Box>
    </Box>
  );
};

export default Post;
