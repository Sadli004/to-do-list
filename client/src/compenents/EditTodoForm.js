import axios from "axios";
import React, { useState } from "react";
import BasicDatePicker from "./DatePicker";

export const EditTodoForm = ({
  taskId,
  Title,
  Description,
  DueDate,
  toggleEdit,
  taskChanged,
  setTaskChanged,
}) => {
  const [title, setTitle] = useState(Title);
  const [description, setdescription] = useState(Description);
  const [dueDate, setDueDate] = useState(DueDate);
  const editTodo = async (TaskID, title, description, dueDate = null) => {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}task/${TaskID}`, {
        Title: title,
        Description: description,
        DueDate: dueDate,
      })
      .then(function (response) {
        console.log("Task edited \n", response.data);
        setTaskChanged(!taskChanged); // Update state variable
      })
      .catch(function (error) {
        console.log("Error while editing: ", error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDueDate =
      dueDate && dueDate ? dueDate.format("YYYY-MM-DD") : null;
    editTodo(taskId, title, description, formattedDueDate);
    toggleEdit(taskId);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setTitle(Title); // Reset the title to the original value
    toggleEdit(taskId); // Exit edit mode
    console.log("Canceled Edit");
  };
  return (
    <div className="EditForm-container Todo  ">
      <form className="EditForm" onSubmit={handleSubmit}>
        <div className="inputs">
          <input
            type="text"
            className="todo-input Title"
            value={title}
            placeholder=" Title "
            onChange={(e) => setTitle(e.target.value)}
          />
          <p className="error-message">
            {Title.length > 50 && "Title cannot exceed 50 characters"}
          </p>
          <p className="error-message">
            {title.trim() === "" && "Title cannot be empty"}
          </p>
          <input
            type="text"
            className="todo-input Description"
            placeholder="Desctiption"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
          <BasicDatePicker
            dueDate={dueDate}
            setDueDate={setDueDate}
            className="todo-input"
          />
        </div>

        <div className="actions">
          <button
            type="reset"
            className=" todo-btn cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button type="submit" className="todo-btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
