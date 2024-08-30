import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({
  Title,
  Description,
  taskId,
  toggleComplete,
  taskStatus,
  dueDate,
  endDate,
  deleteTodo,
  toggleEdit,
  isLast,
}) => {
  const formatDate = (dateString) => {
    if (dateString !== null) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear());
      return `${day}/${month}/${year}`;
    }
  };
  return (
    <div className={`Todo ${isLast ? "last-todo" : ""}`}>
      <div className="task">
        <h2 className={taskStatus === "Done" ? "completed" : "incompleted"}>
          {Title}
        </h2>
        <p>{Description}</p>
        {taskStatus === "Done" ? (
          <div className="EndDate">Completed on : {formatDate(endDate)}</div>
        ) : (
          <div className="dueDate">{formatDate(dueDate)}</div>
        )}
      </div>
      <div className="icons">
        <FontAwesomeIcon
          className="check-icon"
          title={taskStatus === "Done" ? "done" : "In progress"}
          icon={taskStatus === "Done" ? faCircleXmark : faCheck}
          onClick={() => toggleComplete(taskId, taskStatus)}
        />
        {taskStatus === "In Progres" && (
          <FontAwesomeIcon
            className="edit-icon"
            icon={faPenToSquare}
            onClick={() => toggleEdit(taskId)}
          />
        )}

        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteTodo(taskId)}
        />
      </div>
    </div>
  );
};
