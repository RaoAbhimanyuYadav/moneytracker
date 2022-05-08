const localState = JSON.parse(localStorage.getItem("moneytracker"));
console.log(localState);

const initailValue = {
  transactions: [...localState.transactions],
  amount: localState.amount,
  income: localState.income,
  expense: localState.expense,
};

const reducer = (state = initailValue, action) => {
  if (action.type === "ADD_TRAN") {
    let storedAmount = state.amount + action.transaction.amount;

    let newIncome = state.income;
    let newExpense = state.expense;

    console.log(action.transaction.amount);
    if (action.transaction.color === "debit-color") {
      newExpense -= action.transaction.amount;
    } else {
      newIncome += action.transaction.amount;
    }
    const updatedState = {
      ...state,
      transactions: state.transactions.concat(action.transaction),
      amount: +storedAmount.toFixed(2),
      income: +newIncome.toFixed(2),
      expense: +newExpense.toFixed(2),
    };
    localStorage.setItem("moneytracker", JSON.stringify(updatedState));
    return updatedState;
  }

  return state;
};

export default reducer;
