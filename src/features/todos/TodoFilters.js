import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tablist, Tab, Pill } from "evergreen-ui";
import { filterTodos, selectFilteredTodoIds, selectTodoFilter } from "./todosSlice";

function TodoFilters() {
  return (
    <Tablist>
      <TodoFilter filter="All" />
      <TodoFilter filter="Complete" />
      <TodoFilter filter="Incomplete" />
    </Tablist>
  );
}

function TodoFilter({ filter }) {
  const dispatch = useDispatch();
  const isSelected = useSelector((state) => selectTodoFilter(state) === filter);

  const count = useSelector((state) => selectFilteredTodoIds(state, filter).length);

  const handleSelect = () => {
    dispatch(filterTodos(filter));
  };

  return (
    <Tab isSelected={isSelected} onSelect={handleSelect}>
      {filter} <Pill>{count}</Pill>
    </Tab>
  );
}

export { TodoFilters as default, TodoFilters };
