import React from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface ICustomizedSnackbars {
  open: boolean;
  message?: string;
  severity?: AlertColor;
  autoHideDuration?: number;
  vertical?: SnackbarOrigin["vertical"];
  horizontal?: SnackbarOrigin["horizontal"];
  handleClose?: () => void;
}

export default function CustomizedSnackbars({
  open,
  message = "Something went wrong!",
  severity = "error",
  autoHideDuration = 6000,
  vertical = "bottom",
  horizontal = "center",
  handleClose,
}: ICustomizedSnackbars) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical, horizontal }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
