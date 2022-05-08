import React from "react";
import { connect } from "react-redux";
import "./history.css";
import ClearAllIcon from "@mui/icons-material/ClearAll";
const History = (props) => {
  const handleClear = () => {
    localStorage.removeItem("moneytracker");
    props.clearStore();
  };

  return (
    <div className="history">
      <div className="icon-title">
        <h3>History</h3>
        <ClearAllIcon onClick={handleClear} />
      </div>
      <ul>
        {!props.state.length && <div>No Transition</div>}
        {props.state &&
          props.state.map((detail) => {
            return (
              <li key={detail.key}>
                <div className="transition">
                  <div className="trans-type">{detail.type}</div>
                  <div className="trans-amount">
                    {detail.amount > 0 && "+"}
                    {detail.amount.toFixed(2)}
                  </div>
                </div>
                <div className={`trans-color ${detail.color}`}></div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { state: state.transactions };
};
const mapReducerToProps = (dispatch) => {
  return {
    clearStore: () => {
      dispatch({ type: "CLEAR" });
    },
  };
};
export default connect(mapStateToProps, mapReducerToProps)(History);
