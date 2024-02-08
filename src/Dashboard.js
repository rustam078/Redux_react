import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./Authentication";
import axios from "axios";
import Counter from "./Counter";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  const dispatch = useDispatch();
  const user = sessionStorage.getItem("user");
  let token=null;
  if (user) {
    const userData = JSON.parse(user);
     token = userData.token;
    console.log(token);
  } else {
    console.error("User data not found in sessionStorage");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/api/v1/auth/validatetoken/${token}`);
        dispatch(authAction.setEmail(response.data.email))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const isAuth = useSelector((state) => state.auth.userEmail);
  return <div> Hii {isAuth} Dashboard
  
<Outlet/>
  </div>;
};

export default Dashboard;
