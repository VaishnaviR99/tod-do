import React, { useState } from "react"
import { Link, useLocation } from 'react-router-dom';
import "../styles/home.css"

function Home() {
    const location = useLocation()
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editTask, setEditTask] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();

        if (newTask.trim() !== '') {
            setTasks([...tasks, newTask]);
            setNewTask('');
        }
        
    };

    const handleEditTask = (index) => {
        setEditTask(tasks[index]);
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleUpdateTask = () => {
       
        if (editTask.trim() !== '') {
            setTasks([...tasks, editTask]);
            setEditTask('');
        }
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (

        <div className="page3">
            <div className="homepage">

                <div className="heading3">
                    <h1>Task Manager</h1>
                    <Link className="logout" to={'/'}>Logout</Link>
                </div>


                <div>
                    <form action="POST">
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <button type="submit" className="taskbtn" onClick={handleAddTask}>Add Task</button>
                    </form>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td>{task}</td>
                                <td>
                                    <button onClick={() => handleEditTask(index)}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteTask(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editTask !== '' && (
                    <div>
                        <input
                            type="text"
                            value={editTask}
                            onChange={(e) => setEditTask(e.target.value)}
                        />
                        <button onClick={handleUpdateTask}>Update Task</button>
                    </div>
                )}

            </div>
        </div>
        
    )
}






export default Home