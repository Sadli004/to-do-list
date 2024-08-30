import React, { useState } from "react";
import axios from "axios";
import BasicDatePicker from "./DatePicker";

export const TodoForm = ({ setShowAddModel, taskChanged, setTaskChanged }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);

  const addTodo = async (title, description, dueDate) => {
    console.log(dueDate);

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}task`,
        {
          title: title,
          description: description ? description : null,
          dueDate: dueDate,
          // ? dueDate.toISOString() : null,
        },
        {
          withCredentials: true,
        }
      )
      .then(function () {
        console.log("Task added successfully");
        setTaskChanged(!taskChanged);
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
      const formattedDueDate = dueDate ? dueDate.format("YYYY-MM-DD") : null;
      addTodo(title, description, formattedDueDate);
      setTitle("");
      setDescription("");
      setDueDate(null);
      setShowAddModel(false);
    }
  };
  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDueDate();
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
          <BasicDatePicker
            className="todo-input"
            dueDate={dueDate}
            setDueDate={setDueDate}
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
