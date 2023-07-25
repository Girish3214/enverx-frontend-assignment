import { Box, Container } from "@mui/material";
import Tracker from "./components/Tracker";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import {
  getExpense,
  getIncome,
  setUserId,
} from "./redux/actions/ExpenseAction";

function App() {
  const dispatch = useDispatch();

  const userData = sessionStorage.getItem("user");

  useEffect(() => {
    if (Object.entries(userData).length !== 0) {
      dispatch(getExpense());
    }
    return () => {};
  }, [userData]);

  useEffect(() => {
    const getData = async () => {
      await dispatch(setUserId());
      dispatch(getIncome());
    };
    getData();

    return () => {};
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ flexGrow: 1, marginTop: 8 }} borderRadius={8}>
        <Tracker />
      </Box>
    </Container>
  );
}

export default App;
