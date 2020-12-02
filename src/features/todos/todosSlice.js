//import { createSlice } from "@reduxjs/toolkit";

const ADD_TODO = "todos/add";
const COMPLETE_TODO = "todos/complete";
const REMOVE_TODO = "todos/remove";

function addTodo() {}

function completeTodo() {}

function removeTodo() {}

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
    case COMPLETE_TODO:
    case REMOVE_TODO:
    default:
      return state;
  }
}

const actions = {
  addTodo,
  completeTodo,
  removeTodo,
};

export { reducer as default, reducer as todosReducer, actions, addTodo, completeTodo, removeTodo };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTodos = (state) => state.todos;
