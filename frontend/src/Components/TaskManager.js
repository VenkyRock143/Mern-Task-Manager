import { useState, useRef, useEffect } from "react";
import axios from "axios";

// Update this URL to your deployed backend API URL
const API_URL = 'https://mern-task-manager-bkva.onrender.com/api/tasks';

export default function TaskManager() {
    const [formData, setFormData] = useState({ title: "", description: "", status: "To Do" });
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");

    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(API_URL);
                setTasks(res.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        titleRef.current.focus();
    
        try {
            await axios.post(API_URL, {
                title: formData.title,
                description: formData.description,
                status: formData.status
            });
    
            setFormData({ title: "", description: "", status: "To Do" });
            const res = await axios.get(API_URL);
            setTasks(res.data);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };
    
    const removeTask = async (id) => {
        console.log('Removing task with ID:', id); // Debug line
        try {
          await axios.delete(`${API_URL}/${id}`);
          console.log('Task removed successfully'); // Debug line
          const res = await axios.get(API_URL);
          setTasks(res.data);
        } catch (error) {
          console.error('Error deleting task:', error); // Debug line
        }
      };
      
    
    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(`${API_URL}/${id}`, { status: newStatus });
            const res = await axios.get(API_URL);
            setTasks(res.data);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const filteredTasks = statusFilter === "All" ? tasks : tasks.filter(task => task.status === statusFilter);

    const getStatusStyle = (status) => {
        switch (status) {
            case "To Do":
                return { color: 'blue' };
            case "In Progress":
                return { color: 'orange' };
            case "Done":
                return { color: 'green' };
            default:
                return {};
        }
    };

    return (
        <>
            <h1>Create A Task!</h1>
            <div className="section">
                <form onSubmit={handleSubmit} className="task-form">
                    <Row label="Title">
                        <input
                            className="input"
                            placeholder="Enter the Title of the Task here.."
                            ref={titleRef}
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </Row>

                    <Row label="Description">
                        <textarea
                            className="input content"
                            placeholder="Description of the task goes here.."
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </Row>

                    <Row label="Status">
                        <select
                            value={formData.status}
                            required
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            style={{
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px',
                                backgroundColor: '#fff',
                                color: '#333'
                            }}
                        >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </Row>

                    <button className="btn">ADD</button>
                </form>
            </div>

            <hr />

            <h2>Tasks</h2>
            <div style={{
                textAlign: "center",
                paddingBottom: "15px",
                borderRadius: '5px'
            }}>
                <button onClick={() => setStatusFilter("All")}>All</button>
                <button style={{ color: 'blue' }} onClick={() => setStatusFilter("To Do")}>To Do</button>
                <button style={{ color: 'orange' }} onClick={() => setStatusFilter("In Progress")}>In Progress</button>
                <button style={{ color: 'green' }} onClick={() => setStatusFilter("Done")}>Done</button>
            </div>
            <div className="tasks-container">
                {filteredTasks.map((task, i) => (
                    <div className="task" key={i}>
                        <h3>{task.title}</h3>
                        <hr />
                        <p style={{ color: "purple" }}>{task.description}</p>
                        <hr />
                        <div className="status-delete">
                            <div label="Update Status">
                                <p>Status: <span style={getStatusStyle(task.status)}>{task.status}</span></p>
                                <select
                                    value={task.status}
                                    onChange={(e) => updateStatus(task._id, e.target.value)}
                                    style={{
                                        padding: '8px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        fontSize: '16px',
                                        backgroundColor: '#fff',
                                        color: '#333',
                                        marginBottom: "10px"
                                    }}
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                            <div className="task-btn">
                                <button
                                    onClick={() => {
                                        removeTask(task._id);
                                    }}
                                    className="btn remove"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

function Row(props) {
    const { label } = props;
    return (
        <>
            <label>{label}<br /></label>
            {props.children}
            <hr />
        </>
    );
}
