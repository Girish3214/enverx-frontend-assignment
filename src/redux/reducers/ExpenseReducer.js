import * as TYPES from "../actions/actionTypes";

const INITIAL_DATA = {
  expenses: [],
  income: {
    income: 0,
  },
  expense: 0,
  remaining: 0,
  loading: true,
};

const checkExpense = (data) => {
  return data?.reduce((acc, curr) => {
    return acc + parseInt(curr.amount);
  }, 0);
};
export default function ExpenseReducer(state = INITIAL_DATA, action) {
  switch (action.type) {
    case TYPES.SET_EXPENSES:
      const expensesCal = checkExpense(action.payload);
      console.log("Cls", action.payload, state?.income?.income - expensesCal);
      return {
        ...state,
        expenses: action.payload,
        expense: expensesCal,
        remaining: state?.income?.income - expensesCal,
      };

    case TYPES.ADD_EXPENSE_TO_REDUCER:
      return {
        ...state,
        expenses: action.payload,
      };

    case TYPES.SET_INCOME_RD:
      const expensesSoFar = checkExpense(state?.expenses);
      return {
        ...state,
        income: action.payload ?? 0,
        expense: expensesSoFar,
        remaining: !action.payload ? 0 : action.payload?.income - expensesSoFar,
      };

    case TYPES.SET_SPINNER:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}
