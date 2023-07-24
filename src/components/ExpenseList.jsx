import React from "react";
import Box from "@mui/material/Box";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import DataTable from "./DataTable";

export default function ExpenseList() {
  const list = [
    {
      description: "fuel",
      date: "22/04/2023",
      amount: "20",
      category: "Travel",
    },
    {
      description: "food",
      date: "23/04/2023",
      amount: "50",
      category: "Travel",
    },
    {
      description: "health",
      date: "24/04/2023",
      amount: "200",
      category: "Travel",
    },
    {
      description: "rent",
      date: "28/04/2023",
      amount: "150",
      category: "Travel",
    },
  ];
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
  return (
    <Box sx={{ p: 2 }}>
      <DataTable data={list} header={header} />
    </Box>
  );
}
