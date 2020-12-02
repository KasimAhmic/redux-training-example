import React from "react";
import { Pane, Heading } from "evergreen-ui";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";

function Todos() {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      border="default"
      width={800}
    >
      <Pane>
        <Heading margin={8} size={800}>
          My Todo List
        </Heading>
        <Pane margin={8}>
          <TodoForm />
        </Pane>
      </Pane>
      <Pane flex="1" width="100%">
        <TodoFilters />
        <TodoList />
      </Pane>
    </Pane>
  );
}

export { Todos as default, Todos };
