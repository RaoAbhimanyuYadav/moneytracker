import AddTrans from "./AddTrans";
import History from "./History";
import { connect } from "react-redux";
import "./app.css";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

function App(props) {
  const [addPanel, setAddPanel] = useState(false);

  const handleClickedAddTran = () => {
    setAddPanel(true);
  };
  return (
    <div className="app">
      <div>
        <h1>Expense Tracker</h1>
        <div className="icon-title">
          <div className="balance">
            <p>Your Balance</p>
            <p>
              $<span>{props.amount.toFixed(2)}</span>
            </p>
          </div>
          {!addPanel && (
            <div onClick={handleClickedAddTran}>
              <AddIcon />
              Add new
            </div>
          )}
        </div>
      </div>
      <div className="counter">
        <div className="income">
          <p>INCOME</p>
          <p>
            $<span>{props.income.toFixed(2)}</span>
          </p>
        </div>
        <div className="expense">
          <p>EXPENSE</p>
          <p>
            $<span>{props.expense.toFixed(2)}</span>
          </p>
        </div>
      </div>
      <History />
      {addPanel && <AddTrans setAddPanel={setAddPanel} />}
    </div>
  );
}
const mapStateToProps = (state) => {
  return { amount: state.amount, income: state.income, expense: state.expense };
};

export default connect(mapStateToProps)(App);
