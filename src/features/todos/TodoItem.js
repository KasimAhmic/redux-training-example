import React from "react";
import { useDispatch } from "react-redux";
import { Table, IconButton, TrashIcon, TickCircleIcon } from "evergreen-ui";
import { completeTodo, removeTodo } from "./todosSlice";

function TodoItem({ id, content, completed }) {
  const dispatch = useDispatch();

  const handleComplete = (evt) => {
    dispatch(completeTodo(id));
  };

  const handleDelete = (evt) => {
    dispatch(removeTodo(id));
  };

  return (
    <Table.Row onClick={handleComplete} cursor="pointer">
      <Table.Cell>{completed ? <TickCircleIcon color="success" /> : null}</Table.Cell>
      <Table.TextCell
        flexBasis={600}
        flexShrink={0}
        flexGrow={0}
        textAlign="left"
        justifyContent="center"
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
