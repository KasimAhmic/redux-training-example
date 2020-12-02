import React from "react";
import { Tablist, Tab } from "evergreen-ui";

function TodoFilters() {
  return (
    <Tablist>
      <Tab>All</Tab>
      <Tab>Complete</Tab>
      <Tab>Incomplete</Tab>
    </Tablist>
  );
}

export { TodoFilters as default, TodoFilters };
