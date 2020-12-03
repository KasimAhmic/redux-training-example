//import { createSlice } from "@reduxjs/toolkit";
import todoService from "../../services/todos";

const ADD_TODO = "todos/add";
const COMPLETE_TODO = "todos/complete";
const REMOVE_TODO = "todos/remove";
const FETCH_TODOS = "todos/fetch";
const FETCH_TODOS_SUCCESS = "todos/fetch/success";
const FILTER_TODOS = "todos/filter";

function addTodo(content) {
  return async (dispatch) => {
    const todo = await todoService.createTodo(content);

    dispatch({ type: ADD_TODO, payload: todo });
  };
}

function completeTodo(id) {
  return async (dispatch, getState) => {
    let todo = { ...selectTodos(getState()).find((todo) => todo.id === id) };

    todo.completed = true;

    await todoService.updateTodo(todo);

    dispatch({ type: COMPLETE_TODO, payload: id });
  };
}

function removeTodo(id) {
  return async (dispatch) => {
    await todoService.deleteTodo(id);

    dispatch({ type: REMOVE_TODO, payload: id });
  };
}

function getTodos() {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODOS });

    const todos = await todoService.getTodos();

    dispatch({ type: FETCH_TODOS_SUCCESS, payload: todos });
  };
}

function filterTodos(filter) {
  return {
    type: FILTER_TODOS,
    payload: filter,
  };
}

const initialState = {
  loading: false,
  items: [],
  filter: "All",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case COMPLETE_TODO: {
      const id = action.payload;

      const updatedTodos = state.items.map((todo) => {
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
        items: updatedTodos,
      };
    }

    case REMOVE_TODO: {
      const id = action.payload;

      const updatedTodos = state.items.filter((todo) => todo.id !== id);

      return {
        ...state,
        items: updatedTodos,
      };
    }

    case FETCH_TODOS: {
      return {
        ...state,
        loading: true,
      };
    }

    case FETCH_TODOS_SUCCESS: {
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    }

    case FILTER_TODOS: {
      if (state.filter !== action.payload) {
        return {
          ...state,
          filter: action.payload,
        };
      }

      return state;
    }

    default:
      return state;
  }
}

const actions = {
  addTodo,
  completeTodo,
  removeTodo,
  getTodos,
  filterTodos,
};

export {
  reducer as default,
  reducer as todosReducer,
  actions,
  addTodo,
  completeTodo,
  removeTodo,
  getTodos,
  filterTodos,
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) => {
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
