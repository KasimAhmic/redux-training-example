import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tablist, Tab } from "evergreen-ui";
import { filterTodos } from "./todosSlice";

function FilterTab({ text }) {
  const dispatch = useDispatch();
  const isSelected = useSelector((state) => state.todos.filter === text);

  const handleSelect = () => {
    dispatch(filterTodos(text));
  };

  return (
    <Tab isSelected={isSelected} onClick={handleSelect}>
      {text}
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
