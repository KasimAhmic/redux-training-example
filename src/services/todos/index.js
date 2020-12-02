import { get, put, post, del } from "services/api";

async function getTodos() {
  const todos = await get("/todo");

  return todos;
}

async function createTodo(content) {
  const payload = { content };

  const todo = await post("/todo", payload);

  return todo;
}

async function updateTodo(todo) {
  const updatedTodo = await put("/todo", todo);

  return updatedTodo;
}

function deleteTodo(id) {
  return del(`/todo/${id}`);
}

const todoService = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export { todoService as default, getTodos, createTodo, updateTodo, deleteTodo };
