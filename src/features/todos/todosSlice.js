import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "../../services/todos";

const createTodo = createAsyncThunk("todos/create", async (content) => {
  const todo = await todoService.createTodo(content);

  return todo;
});

const fetchTodos = createAsyncThunk("todos/fetch", () => todoService.getTodos());

const completeTodo = createAsyncThunk("todos/complete", async (id, thunk) => {
  let todo = { ...selectTodoById(thunk.getState(), id) };

  todo.completed = true;

  await todoService.updateTodo(todo);

  return id;
});

const removeTodo = createAsyncThunk("todos/remove", async (id) => {
  await todoService.deleteTodo(id);

  return id;
});

const initialState = {
  loading: false,
  items: [],
  filter: "All",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    filterTodos: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.loading = true;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    [createTodo.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    },
    [completeTodo.fulfilled]: (state, action) => {
      const id = action.payload;

      state.items.forEach((todo) => {
        if (todo.id === id) {
          todo.completed = true;
        }
      });
    },
    [removeTodo.fulfilled]: (state, action) => {
      const id = action.payload;

      state.items = state.items.filter((todo) => todo.id !== id);
    },
  },
});

const { reducer } = todoSlice;
const { filterTodos } = todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
const selectTodos = (state) => state.todos.items;

const selectFilteredTodos = (state) => {
  switch (state.todos.filter) {
    case "Complete": {
      return selectTodos(state).filter((todo) => todo.completed);
    }
    case "Incomplete": {
      return selectTodos(state).filter((todo) => !todo.completed);
    }
    default:
      return selectTodos(state);
  }
};

const selectTodoById = (state, id) => selectTodos(state).find((todo) => todo.id === id);

export {
  reducer as default,
  reducer as todosReducer,
  createTodo,
  completeTodo,
  removeTodo,
  fetchTodos,
  filterTodos,
  selectTodos,
  selectFilteredTodos,
  selectTodoById,
};
