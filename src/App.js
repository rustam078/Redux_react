import './App.css';
import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Authentication from './Authentication';
import Dashboard from './Dashboard';
import Counter from './Counter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    children:[
     { path: "counter",
      element:  <Counter/>,
    }
    ]
  },

]);




function App() {

  
  return (
        <RouterProvider router={router} />
  );
}


export default App;


