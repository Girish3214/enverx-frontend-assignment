import React from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Paper, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { convertToIndianCurrency } from "../utils/dateFormat";

export default function IncomeExpense() {
  const matches = useMediaQuery("(max-width:600px)");
  const { income, remaining, expense } = useSelector((state) => state.expenses);
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 2, bgcolor: "#A8E890" }}>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Income: ₹ {convertToIndianCurrency(income?.income) ?? 0}
              <Button variant="contained">Edit</Button>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
          <Paper elevation={2} sx={{ p: 2.5, bgcolor: "#F8C4B4" }}>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: matches ? "center" : "flex-start",
                flexWrap: "wrap",
              }}
            >
              Expense:{" "}
              <Box component="p">₹ {convertToIndianCurrency(expense)}</Box>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
          <Paper elevation={2} sx={{ p: 2.5, bgcolor: "#EEEEEE" }}>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: matches ? "center" : "flex-start",
                flexWrap: "wrap",
              }}
            >
              Remaining:{" "}
              <Box component="p">₹ {convertToIndianCurrency(remaining)}</Box>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
