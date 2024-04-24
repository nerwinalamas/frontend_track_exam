import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../_reducers/taskReducer"

const store = configureStore({
    reducer: taskReducer
});

export default store;