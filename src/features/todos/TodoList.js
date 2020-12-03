import React from "react";
import { useSelector } from "react-redux";
import { Table } from "evergreen-ui";
import TodoItem from "./TodoItem";
import { selectTodos } from "./todosSlice";

function TodoList() {
  const todos = useSelector(selectTodos);

  return (
    <Table>
      <Table.Body>
        {todos.map((todo) => (
          <TodoItem key={todo.id} id={todo.id} content={todo.content} completed={todo.completed} />
        ))}
      </Table.Body>
    </Table>
  );
}

export { TodoList as default, TodoList };
