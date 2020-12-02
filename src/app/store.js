import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/todosSlice";

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});
