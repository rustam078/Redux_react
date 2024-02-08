import { counterReducer } from './Counter';
import { authReducer } from './Authentication';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
const store =configureStore({
    reducer:{
    counter:counterReducer,
    auth:authReducer,
    }
});

export default store;
