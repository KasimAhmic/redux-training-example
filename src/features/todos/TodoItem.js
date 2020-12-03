import React from "react";
import { Table, IconButton, TrashIcon, TickCircleIcon } from "evergreen-ui";

function TodoItem({ id, content, completed }) {
  const handleComplete = (evt) => {
    console.log("complete", id);
  };

  const handleDelete = (evt) => {
    console.log("delete", id);
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
