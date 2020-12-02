//import { createSlice } from "@reduxjs/toolkit";

const ADD_TODO = "todos/add";
const COMPLETE_TODO = "todos/complete";
const REMOVE_TODO = "todos/remove";

function addTodo(content) {
  return {
    type: ADD_TODO,
    payload: {
      content,
      completed: false,
      id: Date.now(),
      date: Date.now(),
    },
  };
}

function completeTodo(id) {
  return {
    type: COMPLETE_TODO,
    payload: id,
  };
}

function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    payload: id,
  };
}

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return [...state, action.payload];
    }

    case COMPLETE_TODO: {
      const id = action.payload;

      return state.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: true,
          };
        }

        return todo;
      });
    }

    case REMOVE_TODO: {
      const id = action.payload;

      return state.filter((todo) => todo.id !== id);
    }

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
