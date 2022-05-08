import React from "react";
import { connect } from "react-redux";
import "./history.css";
const History = (props) => {
  return (
    <div className="history">
      <h3>History</h3>
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
export default connect(mapStateToProps)(History);
