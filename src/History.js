import React, { useState } from "react";
import { connect } from "react-redux";
import "./history.css";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const History = (props) => {
  const handleClear = () => {
    props.clearStore();
  };
  const [editHistory, setEditHistory] = useState(false);
  const [idCheck, setIdCheck] = useState(null);
  const [editTrans, setEditTrans] = useState(false);
  const [editType, setEditType] = useState("");
  const [editID, setEditID] = useState(null);
  const handleEdit = (id) => {
    setEditTrans(true);
  };
  const handleSubmitEditTypeTrans = (e, key) => {
    setEditID(null);
    e.preventDefault();
    props.editTypeStore(key, editType);
    setEditTrans(false);
  };
  const handleDelete = (id) => {
    props.deleteStore(id);
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
                <div
                  className="transition"
                  onMouseEnter={() => {
                    setEditHistory(true);
                    setIdCheck(detail.key);
                  }}
                  onMouseLeave={() => {
                    setEditHistory(false);
                  }}
                >
                  {detail.key !== editID && <div className="trans-type">{detail.type}</div>}
                  {detail.key === editID && editTrans && (
                    <div className="trans-type">
                      <form
                        onSubmit={(e) => {
                          handleSubmitEditTypeTrans(e, detail.key);
                        }}
                      >
                        {" "}
                        <input
                          value={editType}
                          onChange={(e) => {
                            setEditType(e.target.value);
                          }}
                        />
                      </form>
                    </div>
                  )}

                  {detail.key === idCheck && editHistory && (
                    <div>
                      <EditIcon
                        onClick={() => {
                          handleEdit(detail.key);
                          setEditID(detail.key);
                          setEditType(detail.type);
                        }}
                      />
                      <DeleteIcon
                        onClick={() => {
                          handleDelete(detail.key);
                        }}
                      />
                    </div>
                  )}
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
    deleteStore: (id) => {
      dispatch({ type: "DELETE", key: id });
    },
    editTypeStore: (id, type) => {
      dispatch({ type: "EDIT_TYPE", key: id, value: type });
    },
  };
};
export default connect(mapStateToProps, mapReducerToProps)(History);
