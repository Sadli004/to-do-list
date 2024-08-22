import React, { useEffect, useState } from "react";
import { TodoForm } from "../todoForm";
import { Todo } from "../todo";
import { EditTodoForm } from "../EditTodoForm";
import { ConfirmationModal } from "../ConfirmationModel";
import axios from "axios";
import "./TodoWrapper.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";

export const TodoWrapper = () => {
  const [tasks, setTasks] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddModel, setShowAddModel] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [taskChanged, setTaskChanged] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}task`, {
        withCredentials: true,
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      console.log(searchTerm);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}task/search`,
        {
          withCredentials: true,
          params: { searchTerm },
        }
      );
      console.log(response);
      setSearchTerm("");
    } catch (error) {
      console.log(error.message);
    }
  };

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

  const confirmDelete = async (confirmed) => {
    if (confirmed) {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}task/${todoToDelete}`, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log("Deleted task ", response.data);
          setTasks(tasks.filter((task) => task.TaskID !== todoToDelete));
          setTaskChanged(!taskChanged); // Update state variable
        })
        .catch(function (err) {
          console.log("error deleting task ", err);
        });
    }
    setShowConfirmation(false);
    setTodoToDelete(null);
  };

  const editTodo = async (TaskID, title) => {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}task/${TaskID}`, {
        Title: title,
      })
      .then(function (response) {
        console.log("Task edited \n", response.data);
        setTaskChanged(!taskChanged); // Update state variable
      })
      .catch(function (error) {
        console.log("Error while editing: ", error);
      });
  };

  const toggleEdit = (id) => {
    setEditingTaskId(id === editingTaskId ? null : id);
  };

  useEffect(() => {
    fetchTasks();
  }, [taskChanged]); // Add taskChanged to the dependency array

  return (
    <div className="TodoWrapper">
      <div className="TodoWrapper1">
        <div className="header">
          <h1>Today task's</h1>

          <div className="header-options">
            <button onClick={() => setShowAddModel(true)}>
              <FontAwesomeIcon icon={faPlus} />
              Add Task
            </button>
            <div className="search">
              <FontAwesomeIcon icon={faSearch} className="icon" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchTerm);
                  }
                }}
              />
            </div>
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
                editTodo={editTodo}
                toggleEdit={toggleEdit}
              />
            ) : (
              <div key={task.TaskID}>
                <Todo
                  key={task.TaskID}
                  Title={task.Title}
                  Description={task.Description}
                  taskId={task.TaskID}
                  taskStatus={task.TaskStatus}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                  toggleEdit={toggleEdit}
                  isLast={index === tasks.length - 1}
                />
                {showConfirmation && todoToDelete === task.TaskID && (
                  <ConfirmationModal
                    task={todoToDelete}
                    confirmDelete={confirmDelete}
                  />
                )}
              </div>
            )
          )}
        </div>
        {showAddModel && <TodoForm setShowAddModel={setShowAddModel} />}
      </div>
    </div>
  );
};
