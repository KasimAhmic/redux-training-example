import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/todosSlice";

export default function configureAppStore() {
  const store = configureStore({
    reducer: { todos: todoReducer },
  });

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("../features/todos/todosSlice", () =>
      store.replaceReducer({ todos: todoReducer })
    );
  }

  return store;
}
