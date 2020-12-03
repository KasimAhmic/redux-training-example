//import { createSlice } from "@reduxjs/toolkit";
import todoService from "../../services/todos";

const ADD_TODO = "todos/add";
const COMPLETE_TODO = "todos/complete";
const REMOVE_TODO = "todos/remove";

function addTodo(content) {
  return async (dispatch) => {
    const todo = await todoService.createTodo(content);

    dispatch({ type: ADD_TODO, payload: todo });
  };
}

function completeTodo(id) {
  return async (dispatch, getState) => {
    let todo = { ...selectTodoById(getState(), id) };

    todo.completed = true;

    todo = await todoService.updateTodo(todo);

    dispatch({ type: COMPLETE_TODO, payload: id });
  };
}

function removeTodo(id) {
  return async (dispatch) => {
    await todoService.deleteTodo(id);

    dispatch({ type: REMOVE_TODO, payload: id });
  };
}

const initialState = {
  loading: false,
  todos: [],
  filter: "All",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }

    case COMPLETE_TODO: {
      const id = action.payload;

      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: true,
          };
        }

        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case REMOVE_TODO: {
      const id = action.payload;

      const updatedTodos = state.todos.filter((todo) => todo.id !== id);

      return {
        ...state,
        todos: updatedTodos,
      };
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
export const selectTodos = (state) => state.todos.todos;
export const selectTodoById = (state, id) => selectTodos(state).find((todo) => todo.id === id);
