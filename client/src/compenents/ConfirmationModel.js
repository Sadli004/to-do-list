import React, { useEffect, useState } from "react";
import axios from "axios";

export const ConfirmationModal = ({ task, confirmDelete }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const getTask = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}task/${task}`
      );

      setTaskTitle(response.data[0].Title);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTask();
  }, []);
  return (
    <div className="confirmation-modal">
      <div className="message">
        <p>
          Are you sure you want to delete <span>{taskTitle}</span>?
        </p>
      </div>
      <div className="actions">
        <button
          className="confirmation-button cancel"
          onClick={() => confirmDelete(false)}
        >
          Cancel
        </button>
        <button
          className="confirmation-button delete"
          onClick={() => confirmDelete(true)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
