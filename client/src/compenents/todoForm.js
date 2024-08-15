import React, { useState } from "react";
import axios from "axios";
export const TodoForm = ({ setShowAddModel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = async (title, description) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}task`,
        {
          title: title,
          description: description,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log("Task added successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("You need to write a task");
    } else {
      addTodo(title, description);
      setTitle("");
      setDescription("");
      setShowAddModel(false);
    }
  };
  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setShowAddModel(false);
  };
  return (
    // TodoForm component will render a form with input fields for task title and description.
    <div className="TodoForm-container">
      <form className="TodoForm" onSubmit={handleSubmit}>
        <div className="inputs">
          <input
            type="text"
            className="todo-input Title"
            value={title}
            autoComplete="off"
            placeholder="Task Title"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
            type="text"
            className="todo-input Description"
            value={description}
            autoComplete="off"
            placeholder="Task Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="actions">
          <button
            className="todo-btn cancel"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="todo-btn">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};
