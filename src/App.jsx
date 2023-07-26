import { Box, Container, InputAdornment, TextField } from "@mui/material";
import Tracker from "./components/Tracker";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getExpense,
  getIncome,
  setIncome,
  setUserId,
} from "./redux/actions/ExpenseAction";
import Spinner from "./components/Spinner";

function App() {
  const dispatch = useDispatch();
  const { income, loading } = useSelector((state) => state.expenses);

  const userData = sessionStorage.getItem("user");

  useEffect(() => {
    const getData = async () => {
      await dispatch(setUserId());
      await dispatch(getIncome());
    };
    getData();

    return () => {};
  }, []);

  useEffect(() => {
    if (userData && Object.entries(userData).length !== 0) {
      dispatch(getExpense());
    }
    return () => {};
  }, [userData]);

  return (
    <Container maxWidth="md">
      <Box sx={{ flexGrow: 1, marginTop: 8 }} borderRadius={8}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Tracker />
          </>
        )}
      </Box>
    </Container>
  );
}

export default App;
