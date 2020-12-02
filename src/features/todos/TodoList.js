import React from "react";
import { useSelector } from "react-redux";
import { Table } from "evergreen-ui";
import TodoItem from "./TodoItem";
import { selectTodos } from "./todosSlice";

/* function generateFakeTodos() {
  const todos = [];

  for (let i = 0; i < 10; i++) {
    let content =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    todos.push(<TodoItem id={i} content={content} complete={i % 2 === 0} />);
  }

  return todos;
} */

function TodoList(props) {
  const todos = useSelector((state) => selectTodos(state));

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
