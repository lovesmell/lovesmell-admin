import { FC } from "react";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

interface ISignIn {
  email: string;
  password: string;
}

const defaultValues: ISignIn = {
  email: "",
  password: "",
};

const Login: FC = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Provide a valid email address")
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

  const handleSignin = (data: ISignIn) => {
    console.log(data);
  };

  return (
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
    </Paper>
  );
};

export default Login;
