import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Modal(props) {
  const { children, open, setOpen, onSubmit, button } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (e) => {
    onSubmit(e);
    handleClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} sx={{ minHeight: "400px" }}>
        <DialogTitle align="center">{button} Expense</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleAdd}>
            {button}
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
