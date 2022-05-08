import AddTrans from "./AddTrans";
import History from "./History";
import { connect } from "react-redux";


function App(props) {
  return (
    <div className="App">
      <div className="balance">
        <h1>Expense Traker</h1>
        <div><p>Your Balance</p><p>$<span>{props.amount}</span></p></div>
     </div>
     <div className="counter">
      <div className="income"><p>INCOME</p><p>$<span>{props.income}</span></p></div>
      <div className="expense"><p>EXPENSE</p><p>$<span>{props.expense}</span></p></div>
     </div>
     <History/>
     <AddTrans/>
    </div>
  );
}
const mapStateToProps = (state)=>{
  return {amount:state.amount,
    income:state.income,
    expense:state.expense
}}
export default connect(mapStateToProps)(App);
