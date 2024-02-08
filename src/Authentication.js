import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createSlice} from '@reduxjs/toolkit'; 
import classes from './auth.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const navigate=useNavigate();



 

  const handleSignIn = async (event) => {
    event.preventDefault();
    let isValid = true;

    if (email === "") {
      alert("Please enter Email");
      isValid = false;
    }

    if (password === "") {
      alert("Please enter Password");
      isValid = false;
    }
    if (isValid) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/authenticate",
          { email, password }
        );
        console.log("Sign-in response:", response.data);
        const jwtCookie = document.cookie.split('; ').find((cookie) => cookie.startsWith('jwtToken='));

const jwtToken = jwtCookie ? jwtCookie.split('=')[1] : null;

console.log('JWT Token:', jwtToken);
        alert("Sign-in successful");
        sessionStorage.setItem("user", JSON.stringify(response.data));
        navigate("/dashboard");
      } catch (error) {
        console.error("Sign-in error:", error);
        alert("Error signing in");
      }
      setEmail("");
      setPassword("");
    }
  };
  const handleLogout = (e) => {
    dispatch(authAction.logout());
    console.log(isAuth)
  };


  return (
    <div className={classes.container}>
  {!isAuth &&(
     <form onSubmit={handleSignIn} className={classes.formstyle}>
      
      <input
           type="email"
           placeholder="Enter email..."
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
         />
      <input
           type="password"
           placeholder="Enter password..."
           value={password}
           onChange={(e)=>setPassword(e.target.value)}
         />
   
         <button type="submit">Login</button>
      </form>
       )}

      {isAuth &&(
       <>
        <h2> you have Sucessfully login......</h2>
        <button onClick={handleLogout}>Logout</button>
       </>
      )}
    </div>
  );
};



const initialAuthState = {
  isAuthenticated: false,
  userEmail: '', // Initialize userEmail as an empty string
};

const AuthSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.userEmail = action.payload; 
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('userEmail', action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userEmail = ''; // Clear the user's email on logout
    },
    setEmail(state,action){
      state.userEmail = action.payload;
    }
  },
});


export const authAction=AuthSlice.actions;
export const authReducer=AuthSlice.reducer;
export default Authentication;
