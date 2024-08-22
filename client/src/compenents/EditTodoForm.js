import React, { useState } from "react";

export const EditTodoForm = ({ taskId, Title, editTodo, toggleEdit }) => {
  const [title, setTitle] = useState(Title);

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(taskId, title);
    toggleEdit(taskId);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setTitle(Title); // Reset the title to the original value
    toggleEdit(taskId); // Exit edit mode
    console.log("Canceled Edit");
  };
  return (
    <div className="edit-todo-container">
      <form className="TodoForm update-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          value={title}
          placeholder=" Update Task "
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <p className="error-message">
          {Title.length > 50 && "Title cannot exceed 50 characters"}
        </p>
        <p className="error-message">
          {title.trim() === "" && "Title cannot be empty"}
        </p>
        <div
          className="edit-buttons"
          style={{ display: "flex", alignItems: "baseline", gap: "2px" }}
        >
          <div className="">
            <button
              type="reset"
              className=" cancel-edit-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
          <div className="">
            <button type="submit" className="submit-edit-btn">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
