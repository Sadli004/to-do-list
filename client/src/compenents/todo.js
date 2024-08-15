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
  deleteTodo,
  toggleEdit,
}) => {
  return (
    <div className="Todo">
      <div className="task">
        <h2 className={taskStatus === "Done" ? "completed" : "incompleted"}>
          {Title}
        </h2>

        <p>{Description}</p>
      </div>
      <div className="icons">
        <FontAwesomeIcon
          className="check-icon"
          icon={taskStatus === "Done" ? faCircleXmark : faCheck}
          onClick={() => toggleComplete(taskId, taskStatus)}
        />
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={() => toggleEdit(taskId)}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteTodo(taskId)}
        />
      </div>
    </div>
  );
};
