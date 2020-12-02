import React from "react";
import { Table } from "evergreen-ui";
import TodoItem from "./TodoItem";

function generateFakeTodos() {
  const todos = [];

  for (let i = 0; i < 10; i++) {
    let content =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    todos.push(<TodoItem id={i} content={content} complete={i % 2 === 0} />);
  }

  return todos;
}

function TodoList(props) {
  return (
    <Table>
      <Table.Body>{generateFakeTodos()}</Table.Body>
    </Table>
  );
}

export { TodoList as default, TodoList };
