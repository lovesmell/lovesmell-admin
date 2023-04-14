"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import CustomizedSnackbars, {
  ICustomizedSnackbars,
} from "@lovesmell/components/CustomizedSnackbar";

import AuthRoute from "@lovesmell/HOC/authRoute";

import signIn from "@lovesmell/utils/auth/signIn";
import signOut from "@lovesmell/utils/auth/signOut";

interface ISignIn {
  email: string;
  password: string;
}

const defaultValues: ISignIn = {
  email: "",
  password: "",
};

const Login: FC = () => {
  const router = useRouter();

  const [snackbar, setSnackbar] = useState<ICustomizedSnackbars>({
    open: false,
  });

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please provide a valid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignIn>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const handleSignin = async (data: ISignIn) => {
    const snackbar: ICustomizedSnackbars = {
      open: true,
      message: "Incorrect email address or password, please try again",
      severity: "error",
    };
    const { email, password } = data;

    if (email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      setSnackbar(snackbar);
      return;
    }

    try {
      const { error, result } = await signIn(email, password);

      if (error) {
        setSnackbar(snackbar);
        return;
      }

      if (result?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setSnackbar(snackbar);
        signOut();
        return;
      }

      router.push("/");
    } catch (e) {
      setSnackbar({ ...snackbar, message: e.message });
    }
  };

  return (
    <AuthRoute>
      <Paper
        elevation={10}
        sx={{ padding: 5, margin: "auto", maxWidth: "500px" }}
      >
        <Box>
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Username"
                  placeholder="Enter username"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.email)}
                  helperText={errors.email && errors.email?.message}
                />
              );
            }}
          />
        </Box>

        <Box mt={4}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.password)}
                  helperText={errors.password && errors.password?.message}
                />
              );
            }}
          />
        </Box>

        <Box mt={4}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            disabled={!isValid}
            onClick={handleSubmit(handleSignin)}
          >
            Sign in
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

export default Login;
