import React from "react";
import { TextInput, Button } from "evergreen-ui";

function TodoForm(props) {
  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log("submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput placeholder="Enter a todo..." />
      <Button marginLeft={4} type="submit" appearance="primary">
        Submit
      </Button>
    </form>
  );
}

export { TodoForm as default, TodoForm };
