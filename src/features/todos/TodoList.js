import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Table } from "evergreen-ui";
import TodoItem from "./TodoItem";
import { getTodos, selectFilteredTodos } from "./todosSlice";

function TodoList(props) {
  const dispatch = useDispatch();

  const todos = useSelector((state) => selectFilteredTodos(state));
  const loading = useSelector((state) => state.todos.loading);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  if (loading) return "Loading...";

  return (
    <Table>
      <Table.Body>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </Table.Body>
    </Table>
  );
}

export { TodoList as default, TodoList };
