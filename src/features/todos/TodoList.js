import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Table, Spinner, Pane } from "evergreen-ui";
import TodoItem from "./TodoItem";
import { fetchTodos, selectFilteredTodoIds } from "./todosSlice";

function TodoList() {
  const dispatch = useDispatch();

  const ids = useSelector(selectFilteredTodoIds);
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
        {ids.map((id) => (
          <TodoItem key={id} id={id} />
        ))}
      </Table.Body>
    </Table>
  );
}

export { TodoList as default, TodoList };
