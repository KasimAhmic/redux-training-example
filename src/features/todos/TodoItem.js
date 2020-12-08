import React, { memo } from "react";
import { Table, IconButton, TrashIcon, TickCircleIcon } from "evergreen-ui";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodoComplete, removeTodo, selectTodoById } from "./todosSlice";

function _TodoItem({ id }) {
  const dispatch = useDispatch();

  const { completed, content } = useSelector((state) => selectTodoById(state, id));

  const handleComplete = (evt) => {
    dispatch(toggleTodoComplete(id));
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

const TodoItem = memo(_TodoItem);

export { TodoItem as default, TodoItem };
