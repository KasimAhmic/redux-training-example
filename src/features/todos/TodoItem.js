import React from "react";
import { Table, IconButton, TrashIcon, Switch } from "evergreen-ui";

function TodoItem({ id, content, complete }) {
  const handleComplete = (evt) => {
    console.log("complete", id);
  };

  const handleDelete = (evt) => {
    console.log("delete", id);
  };

  return (
    <Table.Row>
      <Table.TextCell flexBasis={600} flexShrink={0} flexGrow={0} textAlign="left">
        {content}
      </Table.TextCell>
      <Table.Cell
        justifyContent="flex-end"
        rightView={<IconButton icon={TrashIcon} appearance="minimal" onClick={handleDelete} />}
      >
        <Switch checked={complete} onChange={handleComplete} />
      </Table.Cell>
    </Table.Row>
  );
}

export { TodoItem as default, TodoItem };
