import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";

function Home() {
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://ill-jade-tick-yoke.cyclic.app/api/tasks"
        ); // Replace '/api/tasks' with your actual endpoint for fetching tasks
        setTasks(response.data.tasks);
        console.log("task: ", response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if (JSON.parse(localStorage.getItem("login")).length > 0) {
      fetchTasks();
    }
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (newTask.trim() !== "") {
      try {
        const response = await axios.post(
          "https://ill-jade-tick-yoke.cyclic.app/add-task",
          {
            title: newTask,
            description: "",
          }
        ); // Replace '/add-task' with your actual endpoint for adding a task
        setTasks([...tasks, response.data.task]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // const handleEditTask = (index) => {
  //   setEditTask(tasks[index]);
  //   console.log(tasks[index]);
  //   setTasks(tasks.filter((_, i) => i !== index));
  // };

  const handleUpdateTask = async () => {
    if (editTask.trim() !== "") {
      try {
        const updatedTask = {
          ...tasks.find((task, index) => index !== tasks.indexOf(editTask)),
          title: editTask,
        };
        await axios.put(
          `https://ill-jade-tick-yoke.cyclic.app/update-task/${editTask._id}`,
          updatedTask
        ); // Replace `/update-task/${editTask._id}` with your actual endpoint for updating a task
        setTasks([
          ...tasks.filter((task) => task._id !== editTask._id),
          updatedTask,
        ]);
        setEditTask("");
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const handleDeleteTask = async (index) => {
    const deletedTask = tasks[index];
    try {
      await axios.delete(
        `https://ill-jade-tick-yoke.cyclic.app/delete-task/${deletedTask._id}`
      ); // Replace `/delete-task/${deletedTask._id}` with your actual endpoint for deleting a task
      setTasks(tasks.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="page3">
      <div className="homepage">
        <div className="heading3">
          <h1>Task Manager</h1>
          <Link
            className="logout"
            to={"/"}
            onClick={() => localStorage.clear("login")}
          >
            Logout
          </Link>
        </div>
        <div>
          <form action="POST">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit" className="taskbtn" onClick={handleAddTask}>
              Add Task
            </button>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              {/* <th>Edit</th> */}
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task, index) => (
              <tr key={index}>
                <td>{task.title}</td>
                {/* <td>
                  <button onClick={() => handleEditTask(index)}>Edit</button>
                </td> */}
                <td>
                  <button onClick={() => handleDeleteTask(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editTask !== "" && (
          <div>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) => setEditTask(e.target.value)}
            />
            <button onClick={handleUpdateTask}>Update Task</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
