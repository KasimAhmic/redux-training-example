import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import todoService from "../../services/todos";

const todoAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date - a.date,
});
const initialState = todoAdapter.getInitialState({ loading: false, filter: "All" });

const todoSelectors = todoAdapter.getSelectors((state) => state.todos);

const selectFilteredTodos = (state) => {
  switch (state.todos.filter) {
    case "Complete": {
      return todoSelectors.selectAll(state).filter((todo) => todo.completed);
    }
    case "Incomplete": {
      return todoSelectors.selectAll(state).filter((todo) => !todo.completed);
    }
    default:
      return todoSelectors.selectAll(state);
  }
};

const createTodo = createAsyncThunk("todos/create", async (content) => {
  const todo = await todoService.createTodo(content);

  return todo;
});

const fetchTodos = createAsyncThunk("todos/fetch", () => todoService.getTodos());

const completeTodo = createAsyncThunk("todos/complete", async (id, thunk) => {
  let todo = { ...todoSelectors.selectById(thunk.getState(), id) };

  todo.completed = true;

  await todoService.updateTodo(todo);

  return id;
});

const removeTodo = createAsyncThunk("todos/remove", async (id) => {
  await todoService.deleteTodo(id);

  return id;
});

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

      todoAdapter.setAll(state, action.payload);
    },
    [createTodo.fulfilled]: todoAdapter.addOne,
    [completeTodo.fulfilled]: (state, action) => {
      const id = action.payload;

      todoAdapter.updateOne(state, { id, changes: { completed: true } });
    },
    [removeTodo.fulfilled]: todoAdapter.removeOne,
  },
});

const { reducer } = todoSlice;
const { filterTodos } = todoSlice.actions;
const { selectAll: selectTodos, selectById: selectTodoById } = todoSelectors;

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
