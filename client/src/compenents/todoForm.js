import React, { useState } from "react";
import axios from "axios";
export const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("You need to write a task");
    } else {
      addTodo(title);
      setTitle("");
    }
  };
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={title}
        placeholder="what is the task today ?"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
