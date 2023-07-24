import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import IncomeExpense from "./IncomeExpense";
import ExpenseList from "./ExpenseList";
import AddExpenses from "./AddExpenses";
import { Typography } from "@mui/material";

export default function Tracker() {
  return (
    <>
      <Paper elevation={3}>
        <Typography
          variant="h4"
          align="center"
          sx={{ p: 2, borderBottom: "1px solid grey" }}
          gutterBottom
        >
          Expense Planner
        </Typography>
        <Grid container>
          <Grid item xs={12}>
            <IncomeExpense />
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ mt: 2 }}>
        <Grid container>
          <Grid item xs={12}>
            <AddExpenses />
          </Grid>
          <Grid item xs={12}>
            <ExpenseList />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
