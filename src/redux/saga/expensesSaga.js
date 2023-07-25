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
  try {
    const data = yield signInAnonymously(auth);
    sessionStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

function* getExpenses() {
  const { user } = JSON.parse(sessionStorage.getItem("user"));
  try {
    const data = yield getDocs(collection(db, "users", user.uid, "expenses"));

    const expenses = yield data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    yield put({
      type: SET_EXPENSES,
      payload: expenses,
    });
  } catch (error) {
    console.log(error);
  }
}
function* addExpense({ payload }) {
  const { user } = JSON.parse(sessionStorage.getItem("user"));
  try {
    yield addDoc(collection(db, "users", user.uid, "expenses"), payload);
  } catch (error) {
    console.log(error);
  }
}
function* deleteExpense({ payload }) {
  const { user } = JSON.parse(sessionStorage.getItem("user"));
  try {
    yield deleteDoc(doc(db, "users", user.uid, "expenses", payload));
  } catch (error) {
    console.log(error);
  }
}

function* updateExpense({ payload }) {
  const { user } = JSON.parse(sessionStorage.getItem("user"));
  try {
    yield updateDoc(
      doc(db, "users", user.uid, "expenses", payload.id),
      payload
    );
  } catch (error) {
    console.log(error);
  }
}

function* getIncome() {
  const { user } = JSON.parse(sessionStorage.getItem("user"));
  try {
    const data = yield getDocs(
      collection(db, "users", user.uid, "transactions")
    );

    const expenses = yield data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    yield put({
      type: SET_INCOME_RD,
      payload: expenses[0],
    });
  } catch (error) {
    console.log(error);
  }
}

function* setIncome() {
  const { user } = JSON.parse(sessionStorage.getItem("user"));
  try {
    yield addDoc(collection(db, "users", user.uid, "transactions"), payload);
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
}

export default expenseSaga;
