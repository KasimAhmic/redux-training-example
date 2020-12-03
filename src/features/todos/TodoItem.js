import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, IconButton, TrashIcon, TickCircleIcon } from "evergreen-ui";
import { toggleTodoCompleted, removeTodo, selectTodoById } from "./todosSlice";

function TodoItem({ id }) {
  const dispatch = useDispatch();

  const todo = useSelector((state) => selectTodoById(state, id));
  const { content, completed } = todo;

  const handleComplete = (evt) => {
    dispatch(toggleTodoCompleted(id));
  };

  const handleDelete = (evt) => {
    dispatch(removeTodo(id));
  };

  return (
    <Table.Row>
      <Table.Cell>{completed ? <TickCircleIcon color="success" /> : null}</Table.Cell>
      <Table.TextCell
        flexBasis={600}
        flexShrink={0}
        flexGrow={0}
        textAlign="left"
        justifyContent="center"
        onClick={handleComplete}
        cursor="pointer"
      >
        {completed ? <s>{content}</s> : content}
      </Table.TextCell>
      <Table.Cell
        justifyContent="flex-end"
        rightView={<IconButton icon={TrashIcon} appearance="minimal" onClick={handleDelete} />}
      />
    </Table.Row>
  );
}

export { TodoItem as default, TodoItem };
