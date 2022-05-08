
const initailValue = {
    transactions:[],
    amount:0,
    income:0,
    expense:0
}

const reducer =(state = initailValue , action)=>{
    if(action.type==='ADD_TRAN'){
        let storedAmount = state.amount
        let stringAmount =action.transaction.amount;
        let newIncome = state.income;
        let newExpense = state.expense;
        if(action.transaction.amount.substring(0,1)==="-"||action.transaction.amount.substring(0,1)==="+"){
          stringAmount =action.transaction.amount.slice(1,action.transaction.amount.length);
        }
        let enteredAmount = parseInt(stringAmount)
        if(action.transaction.color==='debit-color'){
          storedAmount-=enteredAmount
          newExpense +=  enteredAmount
        }else{
          storedAmount+=enteredAmount
          newIncome +=enteredAmount
        }
        return{
            ...state,
            transactions:state.transactions.concat(action.transaction),
            amount:storedAmount,
            income:newIncome,
            expense:newExpense
        }
    }
   
    return state
}


export default reducer