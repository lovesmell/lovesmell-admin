"use client";

import { FC, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

import Editor from "@lovesmell/components/Editor";
import AuthRoute from "@lovesmell/HOC/authRoute";
import CustomizedSnackbars, {
  ICustomizedSnackbars,
} from "@lovesmell/components/CustomizedSnackbar";

import getPost from "@lovesmell/utils/db/getPost";
import addPost from "@lovesmell/utils/db/addPost";
import updatePost from "@lovesmell/utils/db/updatePost";

interface IPost {
  title: string;
  body: string;
}

const defaultValues: IPost = {
  title: "",
  body: "",
};

const Post: FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<ICustomizedSnackbars>({
    open: false,
  });

  const PostSchema = yup.object().shape({
    title: yup.string().required("Please fill this out"),
    body: yup.string().required("Please fill this out"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IPost>({
    mode: "onChange",
    resolver: yupResolver(PostSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: IPost) => {
    try {
      let response;
      if (isUpdate) {
        response = await updatePost("posts", id!, data);
      } else {
        response = await addPost("posts", data);
      }

      const { error } = response;
      if (error) {
        console.log(error);
        return;
      }

      setSnackbar({ open: true, message: "done", severity: "success" });
      reset({ title: "", body: "" });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getEditPost = async () => {
      try {
        const { result } = await getPost("posts", id!);

        if (result) {
          const { title = "", body = "" } = result;
          reset({ title, body });
          setIsUpdate(true);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (id) {
      getEditPost();
    }
  }, [id, reset]);

  return (
    <AuthRoute>
      <Paper elevation={10} sx={{ padding: 5, margin: "auto" }}>
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
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
          >
            {isUpdate ? "Update Post" : "Add Post"}
          </Button>
        </Box>

        <CustomizedSnackbars
          {...snackbar}
          handleClose={() => setSnackbar({ open: false })}
        />
      </Paper>
    </AuthRoute>
  );
};

export default Post;
