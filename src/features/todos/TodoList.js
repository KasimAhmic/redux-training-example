import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Spinner, Pane } from "evergreen-ui";
import TodoItem from "./TodoItem";
import { fetchTodos, selectFilteredTodoIds } from "./todosSlice";

function TodoList() {
  const dispatch = useDispatch();

  const todoIds = useSelector(selectFilteredTodoIds);
  const loading = useSelector((state) => state.todos.loading);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return (
      <Pane display="flex" alignItems="center" justifyContent="center">
        <Spinner />
      </Pane>
    );
  }

  return (
    <Table>
      <Table.Body>
        {todoIds.map((id) => (
          <TodoItem key={id} id={id} />
        ))}
      </Table.Body>
    </Table>
  );
}

export { TodoList as default, TodoList };
