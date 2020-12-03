import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput, Button } from "evergreen-ui";
import { addTodo } from "./todosSlice";

function TodoForm(props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(addTodo(value));

    setValue("");
  };

  const handleChange = (evt) => {
    setValue(evt.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput placeholder="Enter a todo..." value={value} onChange={handleChange} />
      <Button marginLeft={4} type="submit" appearance="primary">
        Submit
      </Button>
    </form>
  );
}

export { TodoForm as default, TodoForm };
