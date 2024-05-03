import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookReducer from './bookSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  books: bookReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
