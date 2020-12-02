import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput, Button } from "evergreen-ui";
import { addTodo } from "./todosSlice";

function TodoForm(props) {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(addTodo(content));

    setContent("");
  };

  const handleChange = (evt) => {
    setContent(evt.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput placeholder="Enter a todo..." onChange={handleChange} value={content} />
      <Button marginLeft={4} type="submit" appearance="primary">
        Submit
      </Button>
    </form>
  );
}

export { TodoForm as default, TodoForm };
