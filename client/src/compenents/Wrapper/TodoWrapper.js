import React, { useEffect, useState } from "react";
import { TodoForm } from "../todoForm";
import { Todo } from "../todo";
import { EditTodoForm } from "../EditTodoForm";
import { ConfirmationModal } from "../ConfirmationModel";
import axios from "axios";
import "./TodoWrapper.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSliders } from "@fortawesome/free-solid-svg-icons";
import SearchComponent from "../searchComponent";

export const TodoWrapper = ({
  tasks,
  setTasks,
  taskChanged,
  setTaskChanged,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddModel, setShowAddModel] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const location = useLocation();

  const toggleComplete = async (TaskID, taskStatus) => {
    let newStatus = taskStatus === "Done" ? "In Progres" : "Done";
    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}task/${TaskID}`,
        {
          TaskStatus: newStatus,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(`Task is set to ${newStatus} \n`, response.data);
        setTaskChanged(!taskChanged); // Update state variable
      })
      .catch(function (error) {
        console.log("Error while editing: ", error);
      });
  };

  const deleteTodo = (TaskID) => {
    setShowConfirmation(true);
    setTodoToDelete(TaskID);
  };

  const toggleEdit = (id) => {
    setEditingTaskId(id === editingTaskId ? null : id);
  };

  useEffect(() => {}, [taskChanged]); // Add taskChanged to the dependency array

  return (
    <div className="TodoWrapper">
      <div className="TodoWrapper1">
        <div className="header">
          {(() => {
            switch (location.pathname) {
              case "/":
                return <h1>My tasks</h1>;
              case "/completed":
                return <h1>Completed tasks</h1>;
              case "/today":
                return <h1>Today's tasks</h1>;
              default:
                return <h1>Upcoming tasks</h1>;
            }
          })()}

          <div className="header-options">
            <button onClick={() => setShowAddModel(true)}>
              <FontAwesomeIcon icon={faPlus} />
              Add Task
            </button>
            <SearchComponent
              tasks={tasks}
              setTasks={setTasks}
              setTaskChanged={setTaskChanged}
              taskChanged={taskChanged}
            />
            <div className="filter">
              <FontAwesomeIcon icon={faSliders} />
            </div>
          </div>
        </div>
        <div className="tasks-list">
          {tasks.map((task, index) =>
            editingTaskId === task.TaskID ? (
              <EditTodoForm
                key={task.TaskID}
                taskId={task.TaskID}
                Title={task.Title}
                Description={task.Description}
                DueDate={task.DueDate}
                toggleEdit={toggleEdit}
                taskChanged={taskChanged}
                setTaskChanged={setTaskChanged}
              />
            ) : (
              <div key={task.TaskID}>
                <Todo
                  key={task.TaskID}
                  Title={task.Title}
                  Description={task.Description}
                  taskId={task.TaskID}
                  taskStatus={task.TaskStatus}
                  dueDate={task.DueDate}
                  endDate={task.EndDate}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                  toggleEdit={toggleEdit}
                  isLast={index === tasks.length - 1}
                />
                {showConfirmation && todoToDelete === task.TaskID && (
                  <ConfirmationModal
                    task={todoToDelete}
                    setShowConfirmation={setShowConfirmation}
                    setTodoToDelete={setTodoToDelete}
                    setTaskChanged={setTaskChanged}
                    taskChanged={taskChanged}
                  />
                )}
              </div>
            )
          )}
        </div>
        {showAddModel && (
          <TodoForm
            setShowAddModel={setShowAddModel}
            taskChanged={taskChanged}
            setTaskChanged={setTaskChanged}
          />
        )}
      </div>
    </div>
  );
};
