import React, { useEffect, useState } from "react";
import axios from "axios";

export const ConfirmationModal = ({
  task,
  setShowConfirmation,
  setTodoToDelete,
  setTaskChanged,
  taskChanged,
}) => {
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
  const confirmDelete = async (confirmed) => {
    if (confirmed) {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}task/${task}`, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log("Deleted task ", response.data);
          // setTasks(tasks.filter((task) => task.TaskID !== todoToDelete));
          setTaskChanged(!taskChanged); // Update state variable
        })
        .catch(function (err) {
          console.log("error deleting task ", err);
        });
    }
    setShowConfirmation(false);
    setTodoToDelete(null);
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
