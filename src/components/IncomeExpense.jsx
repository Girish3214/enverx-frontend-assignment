import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { convertToIndianCurrency } from "../utils/dateFormat";
import Modal from "./Modal";
import { setIncome, updateIncome } from "../redux/actions/ExpenseAction";
import { collection, onSnapshot, query } from "firebase/firestore";
import { SET_INCOME_RD } from "../redux/actions/actionTypes";
import { db } from "../config/firebase";

export default function IncomeExpense() {
  const matches = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();
  const { income, remaining, expense } = useSelector((state) => state.expenses);

  const [incomeError, setIncomeError] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  const [newIncome, setNewIncome] = useState(
    income?.income ? income?.income : ""
  );

  const handleInputChange = (e) => {
    setNewIncome(e.target.value);
    console.log(e.target.value);
    if (e.target.value === "0" || e.target.value === 0) {
      setIncomeError(true);
    } else {
      setIncomeError(false);
    }
  };

  const handleIncomeSubmit = () => {
    console.log("cls", incomeError, newIncome);
    if (!incomeError && (newIncome !== 0 || newIncome !== "0")) {
      if (income?.income) {
        dispatch(updateIncome({ id: income?.id, newIncome }));
      } else {
        dispatch(setIncome(newIncome));
      }
      setNewIncome(0);
      setOpenPop(false);
    }
  };

  const handleClose = () => {
    setOpenPop(false);
    setNewIncome(income?.income);
    setIncomeError(false);
  };

  useEffect(() => {
    const userDetails =
      sessionStorage.getItem("user") &&
      JSON.parse(sessionStorage.getItem("user"));

    if (userDetails?.user) {
      onSnapshot(
        query(collection(db, "users", userDetails.user.uid, "transactions")),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log("cls data", data);
          if (data.length !== 0)
            dispatch({
              type: SET_INCOME_RD,
              payload: data[0],
            });
        }
      );
    }

    return () => {};
  }, []);

  useEffect(() => {
    setNewIncome(income?.income);

    return () => {};
  }, [income.income]);

  return (
    <Box sx={{ p: 2 }}>
      <Modal
        open={openPop}
        handleClose={handleClose}
        onSubmit={handleIncomeSubmit}
        button={income?.income ? "Edit" : "Add"}
        tabName="Income"
      >
        <TextField
          label="Income"
          margin="dense"
          required
          fullWidth
          id="income"
          name="Income"
          type="number"
          error={incomeError}
          helperText={incomeError ? "Income should not be 0" : ""}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
          value={newIncome}
          onChange={(e) => handleInputChange(e)}
        />
      </Modal>

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
              Income: ₹{" "}
              {income?.income ? convertToIndianCurrency(income?.income) : 0}
              <Button variant="contained" onClick={() => setOpenPop(true)}>
                {income?.income ? "Edit" : "Add"}
              </Button>
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
