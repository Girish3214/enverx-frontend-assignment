import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import ExpenseReducer from "./reducers/ExpenseReducer";
import expenseSaga from "./saga/expensesSaga";

const rootReducer = combineReducers({
  expenses: ExpenseReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(sagaMiddleware)
      .concat(logger),
});

sagaMiddleware.run(expenseSaga);
export default store;
