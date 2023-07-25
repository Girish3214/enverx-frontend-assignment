import React from "react";
import Modal from "./Modal";
import {
  Autocomplete,
  Box,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { dateFormat } from "../utils/dateFormat";

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

export default function Form({
  expense,
  modalOpen,
  setmodalOpen,
  handleSubmit,
  handleInputChange,
  handleAutoComplete,
  button,
}) {
  return (
    <Modal
      open={modalOpen}
      setOpen={setmodalOpen}
      onSubmit={handleSubmit}
      button={button}
    >
      <Box component="form" noValidate sx={{ mt: 1, p: 2 }}>
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
              value={expense.description}
              onChange={(e) => handleInputChange(e)}
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
              name="category"
              options={EXPENSES_TYPES}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
              value={expense.category}
              onChange={(e, value) => handleAutoComplete("category", value)}
              onClick={(e) => handleAutoComplete("category", value)}
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
              value={expense.amount}
              onChange={(e) => handleInputChange(e)}
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
              id="date"
              name="date"
              type="date"
              value={dateFormat(expense.date)}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
