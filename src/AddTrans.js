import React, { useState } from 'react'
import { connect } from 'react-redux';

const AddTrans = (props) => {
    const [amount,setAmount] = useState('');
    const [type,setType] = useState('');
    const [color,setColor] = useState('credit-color')
    const handleText = (e)=>{
        setType(e.target.value.trim())
    }
    const handleAmount =(e)=>{
        setAmount(e.target.value.trim())
        if(amount.substring(0,1)==="-"){
          setColor('debit-color')
        }else{
          setColor('credit-color')
        }
    }
    const  handleSubmit = (e)=>{
        e.preventDefault()
        const key = new Date();
        const transaction = {color,type,amount,key}
        console.log(transaction)
        setAmount('')
        setType('')
        props.addTrans(transaction)
       


    }
  return (
    <div className='add-tansaction'>
      <h3>Add new transaction</h3>
      <form onSubmit={handleSubmit}>
          <label htmlFor='Text'>Text</label>
          <input placeholder='Enter text...' name='Text' value={type} onChange={handleText}/>
          <label htmlFor='Amount'><p>Amount</p><p>(negative - expense, positive - income)</p></label>
          <input name='Amount' placeholder='Enter amount...' value={amount} onChange={handleAmount}/>
          <button>Add transaction</button>
      </form>
    </div>
  )
}
const mapReducerToProps =(dispatch)=>{
  return{
    addTrans:(tran)=>{dispatch({type:"ADD_TRAN",transaction:tran})},
  }
}

export default connect(null,mapReducerToProps)(AddTrans)
