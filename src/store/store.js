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
    return {
      transactions: [],
      amount: 0,
      income: 0,
      expense: 0,
    };
  }

  return state;
};

export default reducer;
