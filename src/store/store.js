const localState = JSON.parse(localStorage.getItem("moneytracker"));

let initailValue = {
  transactions: [],
  amount: 0,
  income: 0,
  expense: 0,
};
if (localState) {
  initailValue = {
    transactions: [...localState.transactions] || [],
    amount: localState.amount || 0,
    income: localState.income || 0,
    expense: localState.expense || 0,
  };
}
const reducer = (state = initailValue, action) => {
  if (action.type === "ADD_TRAN") {
    let storedAmount = state.amount + action.transaction.amount;

    let newIncome = state.income;
    let newExpense = state.expense;

    if (action.transaction.color === "debit-color") {
      newExpense -= action.transaction.amount;
    } else {
      newIncome += action.transaction.amount;
    }
    const updatedState = {
      ...state,
      transactions: [action.transaction, ...state.transactions],
      // transactions: state.transactions.concat(action.transaction)
      amount: +storedAmount.toFixed(2),
      income: +newIncome.toFixed(2),
      expense: +newExpense.toFixed(2),
    };
    localStorage.setItem("moneytracker", JSON.stringify(updatedState));
    return updatedState;
  }
  if (action.type === "CLEAR") {
    localStorage.removeItem("moneytracker");
    return {
      transactions: [],
      amount: 0,
      income: 0,
      expense: 0,
    };
  }
  if (action.type === "DELETE") {
    let newAmount = state.amount;
    let newIncome = state.income;
    let newExpense = state.expense;
    const newTrans = state.transactions.filter((e) => {
      if (e.key === action.key) {
        newAmount -= e.amount;
        if (e.color === "debit-color") {
          newExpense += e.amount;
        } else {
          newIncome -= e.amount;
        }
      }
      return e.key !== action.key;
    });
    const updatedState = {
      ...state,
      amount: newAmount,
      income: newIncome,
      expense: newExpense,
      transactions: newTrans,
    };
    localStorage.setItem("moneytracker", JSON.stringify(updatedState));
    return updatedState;
  }
  if (action.type === "EDIT_TYPE") {
    let trans = {};
    let newTrans = state.transactions.filter((e) => {
      if (e.key === action.key) {
        trans = { ...e, type: action.value };
      }
      return e.key !== action.key;
    });
    newTrans = [...newTrans, trans];

    const updatedState = {
      ...state,
      transactions: [...newTrans],
    };
    localStorage.setItem("moneytracker", JSON.stringify(updatedState));
    return updatedState;
  }

  return state;
};

export default reducer;
