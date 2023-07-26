import { takeEvery, put } from "redux-saga/effects";
import {
  ADD_EXPENSE,
  UPDATE_EXPENSES,
  DELETE_EXPENSE,
  GET_EXPENSES,
  SET_EXPENSES,
  SET_USER_ID,
  SET_INCOME,
  GET_INCOME,
  SET_INCOME_RD,
  SET_SPINNER,
  UPDATE_INCOME_RD,
  UPDATE_INCOME,
} from "../actions/actionTypes";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { signInAnonymously } from "firebase/auth";

function* getUser() {
  yield put({
    type: SET_SPINNER,
    payload: true,
  });
  try {
    const data = yield signInAnonymously(auth);
    console.log("cls", data);
    sessionStorage.setItem("user", JSON.stringify(data));

    yield put({
      type: SET_SPINNER,
      payload: false,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: SET_SPINNER,
      payload: false,
    });
  }
}

function* getExpenses() {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  try {
    if (userDetails?.user) {
      const data = yield getDocs(
        collection(db, "users", userDetails?.user.uid, "expenses")
      );

      const expenses = yield data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      yield put({
        type: SET_EXPENSES,
        payload: expenses,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
function* addExpense({ payload }) {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  try {
    if (userDetails?.user) {
      yield addDoc(
        collection(db, "users", userDetails?.user.uid, "expenses"),
        payload
      );
    }
  } catch (error) {
    console.log(error);
  }
}
function* deleteExpense({ payload }) {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  try {
    if (userDetails?.user) {
      yield deleteDoc(
        doc(db, "users", userDetails?.user.uid, "expenses", payload)
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateExpense({ payload }) {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  try {
    if (userDetails?.user) {
      yield updateDoc(
        doc(db, "users", userDetails?.user.uid, "expenses", payload.id),
        payload
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* getIncome() {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  yield put({
    type: SET_SPINNER,
    payload: true,
  });
  try {
    if (userDetails?.user) {
      const data = yield getDocs(
        collection(db, "users", userDetails?.user.uid, "transactions")
      );

      const expenses = yield data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      yield put({
        type: SET_INCOME_RD,
        payload: expenses[0],
      });
      yield put({
        type: SET_SPINNER,
        payload: false,
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: SET_SPINNER,
      payload: false,
    });
  }
}

function* setIncome({ payload }) {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  try {
    if (userDetails?.user) {
      yield addDoc(
        collection(db, "users", userDetails?.user.uid, "transactions"),
        { income: payload }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateIncome({ payload }) {
  const userDetails = JSON.parse(sessionStorage.getItem("user"));
  try {
    if (userDetails?.user) {
      yield updateDoc(
        doc(db, "users", userDetails?.user.uid, "transactions", payload.id),
        { income: payload.newIncome }
      );
      yield put({
        type: SET_INCOME_RD,
        payload: { ...payload, income: payload.newIncome },
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* expenseSaga() {
  yield takeEvery(SET_USER_ID, getUser);
  yield takeEvery(ADD_EXPENSE, addExpense);
  yield takeEvery(DELETE_EXPENSE, deleteExpense);
  yield takeEvery(GET_EXPENSES, getExpenses);
  yield takeEvery(UPDATE_EXPENSES, updateExpense);
  yield takeEvery(SET_INCOME, setIncome);
  yield takeEvery(GET_INCOME, getIncome);
  yield takeEvery(UPDATE_INCOME, updateIncome);
}

export default expenseSaga;
