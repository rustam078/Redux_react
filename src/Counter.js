import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createSlice} from '@reduxjs/toolkit'; 
const Counter = () => {
  const [num, setNum] = useState();
  const counter = useSelector((state) => state.counter.counter);
  const toggle = useSelector((state) => state.counter.showtoggle);
  const isAuth = useSelector((state) => state.auth.userEmail);

  const dispatch = useDispatch();

  const handlenum = (e) => {
    setNum(e.target.value);
  };
  const handleIncCounter = () => {
    dispatch(counterAction.increment());
  };

  const handleDecCounter = () => {
    dispatch(counterAction.decerement());
  };

  const handleIncCounterByFive = () => {
    dispatch(counterAction.increase(+num));
  };

  const handletoggle = () => {
    dispatch(counterAction.toggle());
  };

  return (
    <div>
      {toggle &&(<><p>{isAuth}</p><h2>{counter}</h2></>)}
      <input
        type="number"
        placeholder="Enter Number..."
        value={num}
        onChange={handlenum}
      />
      <button onClick={handleIncCounter}>Increment</button>
      <button onClick={handleDecCounter}>Decrement</button>
      <button onClick={handleIncCounterByFive}>Increment By Num</button>
      <button onClick={handletoggle}>Toggle</button>
    </div>
  );
};





const initialCounterState={counter:0,showtoggle:true};


const counterSlice=createSlice({
    name:"counter",
    initialState:initialCounterState,
    reducers:{
        increment(state){
         state.counter++;
        },
        decerement(state){
            state.counter--;
        },
        increase(state,action){
            state.counter= state.counter+action.payload;
        },
        toggle(state){
            state.showtoggle= !state.showtoggle;
        },
    }
})


export const counterAction=counterSlice.actions;
export const counterReducer=counterSlice.reducer;
export default Counter;
