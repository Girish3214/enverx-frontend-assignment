import React, { useState } from "react";
import Box from "@mui/material/Box";

import { Button } from "@mui/material";
import { addExpense } from "../redux/actions/ExpenseAction";
import { useDispatch } from "react-redux";
import Form from "./Form";

const INITIAL_DATA = {
  description: "",
  amount: "",
  category: "",
  date: new Date(),
};

export default function AddExpenses() {
  const dispatch = useDispatch();

  const [modalOpen, setmodalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState(INITIAL_DATA);

  const handleInputChange = (event) => {
    const name = event.target.name;
    let value = name === "date" ? event.target.valueAsDate : event.target.value;
    setNewExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAutoComplete = (name, value) => {
    setNewExpense((prev) => ({
      ...prev,
      [name]: value?.label,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense(newExpense));
    setNewExpense(INITIAL_DATA);
    setmodalOpen(false);
  };

  const handleClose = () => {
    setmodalOpen(false);
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
      <Form
        modalOpen={modalOpen}
        setmodalOpen={setmodalOpen}
        expense={newExpense}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleInputChange={(e) => handleInputChange(e)}
        handleAutoComplete={(e, value) => handleAutoComplete(e, value)}
        button="Add"
      />
    </>
  );
}
