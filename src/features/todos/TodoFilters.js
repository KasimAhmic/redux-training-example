import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tablist, Tab, Pill } from "evergreen-ui";
import { filterTodos, selectTodosByCompletion } from "./todosSlice";

const colorMap = {
  All: "blue",
  Complete: "green",
  Incomplete: "red",
};

function FilterTab({ text }) {
  const dispatch = useDispatch();
  const isSelected = useSelector((state) => state.todos.filter === text);

  const completed = text === "All" ? null : text === "Complete";

  const count = useSelector((state) => selectTodosByCompletion(state, completed).length);

  const handleSelect = () => {
    dispatch(filterTodos(text));
  };

  return (
    <Tab isSelected={isSelected} onSelect={handleSelect}>
      {text} <Pill color={colorMap[text]}>{count}</Pill>
    </Tab>
  );
}

function TodoFilters() {
  return (
    <Tablist>
      <FilterTab text="All" />
      <FilterTab text="Complete" />
      <FilterTab text="Incomplete" />
    </Tablist>
  );
}

export { TodoFilters as default, TodoFilters };
