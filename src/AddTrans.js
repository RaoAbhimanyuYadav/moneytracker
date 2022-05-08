import React, { useState } from "react";
import { connect } from "react-redux";
import "./addtrans.css";
import CloseIcon from "@mui/icons-material/Close";

const AddTrans = (props) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("credit-color");
  const handleText = (e) => {
    setType(e.target.value.trim());
  };
  const handleAmount = (e) => {
    let enteredAmount = +e.target.value;
    setAmount(e.target.value);
    if (enteredAmount < 0) {
      setColor("debit-color");
    } else {
      setColor("credit-color");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const key = new Date();
    const transaction = { color, type, amount: +amount, key };

    setAmount("");
    setType("");
    props.addTrans(transaction);
  };
  return (
    <div className="add-tansaction">
      <div className="icon-title">
        <h3>Add new transaction</h3>
        <CloseIcon
          onClick={() => {
            props.setAddPanel(false);
          }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="Text">Text</label>
        <input placeholder="Enter text..." name="Text" value={type} onChange={handleText} />
        <label htmlFor="Amount">
          <p>Amount</p>
          <p>(negative - expense, positive - income)</p>
        </label>
        <input type="number" step={0.01} name="Amount" placeholder="Enter amount..." value={amount} onChange={handleAmount} />
        <button>Add transaction</button>
      </form>
    </div>
  );
};
const mapReducerToProps = (dispatch) => {
  return {
    addTrans: (tran) => {
      dispatch({ type: "ADD_TRAN", transaction: tran });
    },
  };
};

export default connect(null, mapReducerToProps)(AddTrans);
