import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import Modal from "./Modal";

const EXPENSES_TYPES = [
  {
    label: "Groceries",
    value: "groceries",
  },
  {
    label: "Rent",
    value: "rent",
  },
  {
    label: "Travel",
    value: "travel",
  },
];
export default function AddExpenses() {
  const [modalOpen, setmodalOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Box sx={{ float: "right" }}>
        <Button
          variant="contained"
          sx={{ m: 2 }}
          onClick={() => setmodalOpen(true)}
        >
          Add Expense
        </Button>
      </Box>
      <Modal open={modalOpen} setOpen={setmodalOpen}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, p: 2 }}
        >
          <Grid container gap={1}>
            <Grid item xs={12} md={5}>
              <TextField
                label="Description"
                margin="dense"
                required
                fullWidth
                id="description"
                name="description"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                label="Amount"
                margin="dense"
                required
                fullWidth
                id="amount"
                name="amount"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{ alignItems: "center", display: "flex" }}
            >
              <Autocomplete
                disablePortal
                id="categories"
                options={EXPENSES_TYPES}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{ alignItems: "center", display: "flex" }}
            >
              <TextField
                margin="dense"
                required
                fullWidth
                id="amount"
                name="amount"
                type="date"
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
