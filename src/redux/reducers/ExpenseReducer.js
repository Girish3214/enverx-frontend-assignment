import * as TYPES from "../actions/actionTypes";

const INITIAL_DATA = {
  expenses: [],
  income: {
    income: 0,
  },
  expense: 0,
  remaining: 0,
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
        income: action.payload,
        expense: expensesSoFar,
        remaining: action.payload?.income - expensesSoFar,
      };

    default:
      return state;
  }
}
