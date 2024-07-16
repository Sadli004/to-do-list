import React, { useEffect, useState } from "react";
import { TodoForm } from "./todoForm";
import { Todo } from "./todo";
import { EditTodoForm } from "./EditTodoForm";
import { ConfirmationModal } from "./ConfirmationModel";
import axios from "axios";

export const TodayTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}user/history/d/0`,
        {
          withCredentials: true,
        }
      );
      setTasks(response.data);
      console.log("Today tasks:", response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (title) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}user/history/d/0`,
        {
          title: title,
          description: "Task description",
        },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log("added task :", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    fetchTasks();
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
        })
        .catch(function (err) {
          console.log("error deleting task ", err);
        });
    }
    setShowConfirmation(false);
    setTodoToDelete(null);
    fetchTasks();
  };

  const editTodo = async (TaskID, title) => {
    await axios
      .patch(`${process.env.REACT_APP_API_URL}task/${TaskID}`, {
        Title: title,
      })
      .then(function (response) {
        console.log("Task edited \n", response.data);
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
  }, []);
  return (
    <div className="TodoWrapper">
      <div className="TodoWrapper1">
        <h1>Get Things Done!! </h1>
        <TodoForm addTodo={addTodo} />
        <div className="tasks-list">
          {tasks.map((task) =>
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
                  task={task.Title}
                  taskId={task.TaskID}
                  taskStatus={task.TaskStatus}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                  toggleEdit={toggleEdit}
                />
                {showConfirmation && todoToDelete === task.TaskID && (
                  <ConfirmationModal confirmDelete={confirmDelete} />
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
