import React from 'react'
import { connect } from 'react-redux'

const History = (props) => {
  
  return (
    <div className='history'>
        <h3>History</h3>
        <ul>
        
{!props.state.length && <div>No Transition</div>}
            {props.state && props.state.map((detail)=>{
                return(
                    <li key={detail.key}>
                        <div>
                            <div>{detail.type}</div>
                            <div>{detail.amount}</div>
                        </div>
                        <div>{detail.color}</div>
                    </li>
                )
            })}
        </ul>
      
    </div>
  )
}
const mapStateToProps = (state)=>{
    return {state:state.transactions
  }}
export default connect(mapStateToProps)(History)
