import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import DataTable from "./DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, updateExpense } from "../redux/actions/ExpenseAction";
import Form from "./Form";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { SET_EXPENSES } from "../redux/actions/actionTypes";

export default function ExpenseList() {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);

  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [modalOpen, setmodalOpen] = useState(false);

  const header = [
    {
      label: "Description",
      key: "description",
    },
    {
      label: "Category",
      key: "category",
    },
    {
      label: "Date",
      key: "date",
    },
    {
      label: "Amount",
      key: "amount",
    },
  ];

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  const handleEdit = (row) => {
    setSelectedRow({ ...row, date: new Date(row.date.seconds * 1000) });
    setmodalOpen(true);
  };
  const handleInputChange = (event) => {
    const name = event.target.name;
    let value = name === "date" ? event.target.valueAsDate : event.target.value;
    setSelectedRow((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAutoComplete = (name, value) => {
    setSelectedRow((prev) => ({
      ...prev,
      [name]: value?.label,
    }));
  };

  const handleSubmit = () => {
    dispatch(updateExpense(selectedRow));
  };

  useEffect(() => {
    const { user } = JSON.parse(sessionStorage.getItem("user"));

    if (user) {
      onSnapshot(
        query(collection(db, "users", user.uid, "expenses")),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          dispatch({
            type: SET_EXPENSES,
            payload: data,
          });
        }
      );
    }

    return () => {};
  }, []);

  useEffect(() => {
    setData(expenses);

    return () => {};
  }, [expenses]);

  return (
    <Box sx={{ p: 2 }}>
      <DataTable
        data={data}
        header={header}
        onDelete={(id) => handleDelete(id)}
        onEdit={(row) => handleEdit(row)}
      />

      <Form
        modalOpen={modalOpen}
        setmodalOpen={setmodalOpen}
        expense={selectedRow}
        handleSubmit={handleSubmit}
        handleInputChange={(e) => handleInputChange(e)}
        handleAutoComplete={(e, value) => handleAutoComplete(e, value)}
        button="Edit"
      />
    </Box>
  );
}
