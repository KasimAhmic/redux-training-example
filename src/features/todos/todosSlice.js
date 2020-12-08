import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import todoService from "../../services/todos";

const todoAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date - a.date,
});

const todoSelectors = todoAdapter.getSelectors((state) => state.todos);

const addTodo = createAsyncThunk("todos/add", async (content) => {
  const todo = await todoService.createTodo(content);

  return todo;
});

const toggleTodoComplete = createAsyncThunk("todos/toggleComplete", async (id, thunkApi) => {
  let todo = { ...todoSelectors.selectById(thunkApi.getState(), id) };

  todo.completed = !todo.completed;

  todo = await todoService.updateTodo(todo);

  return { id, changes: { completed: todo.completed } };
});

const removeTodo = createAsyncThunk("todos/remove", async (id) => {
  await todoService.deleteTodo(id);

  return id;
});

const fetchTodos = createAsyncThunk("todos/fetch", async () => todoService.getTodos());

const initialState = {
  loading: false,
  filter: "All",
};

const todosSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState({ initialState }),
  reducers: {
    filterTodos: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [addTodo.fulfilled]: todoAdapter.addOne,
    [fetchTodos.pending]: (state) => {
      state.loading = true;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.loading = false;

      todoAdapter.setAll(state, action.payload);
    },
    [toggleTodoComplete.fulfilled]: todoAdapter.updateOne,
    [removeTodo.fulfilled]: todoAdapter.removeOne,
  },
});

const { reducer, actions } = todosSlice;

export const { filterTodos } = actions;

export const {
  selectIds: selectTodoIds,
  selectEntities: selectTodos,
  selectAll: selectAllTodos,
  selectTotal: selectTotalTodos,
  selectById: selectTodoById,
} = todoSelectors;

export {
  reducer as default,
  reducer as todosReducer,
  actions,
  addTodo,
  toggleTodoComplete,
  removeTodo,
  fetchTodos,
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTodoFilter = (state) => state.todos.filter;

export const selectFilteredTodoIds = (state, filter) => {
  const selectedFilter = filter ?? selectTodoFilter(state);

  switch (selectedFilter) {
    case "Complete":
      return todoSelectors
        .selectAll(state)
        .filter((todo) => todo.completed)
        .map((todo) => todo.id);
    case "Incomplete":
      return todoSelectors
        .selectAll(state)
        .filter((todo) => !todo.completed)
        .map((todo) => todo.id);
    default:
      return todoSelectors.selectIds(state);
  }
};
