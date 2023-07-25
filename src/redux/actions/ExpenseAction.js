import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  GET_EXPENSES,
  SET_USER_ID,
  UPDATE_EXPENSES,
  SET_INCOME,
  GET_INCOME,
} from "./actionTypes";

export const setIncome = (payload) => {
  return {
    type: SET_INCOME,
    payload,
  };
};

export const getIncome = (payload) => {
  return {
    type: GET_INCOME,
    payload,
  };
};

export const setUserId = () => {
  return {
    type: SET_USER_ID,
  };
};

export const getExpense = () => {
  return {
    type: GET_EXPENSES,
  };
};

export const addExpense = (payload) => {
  return {
    type: ADD_EXPENSE,
    payload,
  };
};

export const updateExpense = (payload) => {
  return {
    type: UPDATE_EXPENSES,
    payload,
  };
};

export const deleteExpense = (payload) => {
  return {
    type: DELETE_EXPENSE,
    payload,
  };
};
