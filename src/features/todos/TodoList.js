import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Table, Spinner, Pane } from "evergreen-ui";
import TodoItem from "./TodoItem";
import { fetchTodos, selectFilteredTodos } from "./todosSlice";

function TodoList(props) {
  const dispatch = useDispatch();

  const todos = useSelector(selectFilteredTodos);
  const loading = useSelector((state) => state.todos.loading);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return (
      <Pane display="flex" justifyContent="center" alignItems="center">
        <Spinner />
      </Pane>
    );
  }

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
