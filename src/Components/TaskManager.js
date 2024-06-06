import { useState, useRef, useEffect } from "react";

// Import Firestore reference from firebaseInit file
import { db } from "../firebase-init";

// Import all the required functions from Firestore
import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore"; 

export default function Taskmanager() {
    const [formData, setFormData] = useState({ title: "", description: "", status: "To Do" });
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");

    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    useEffect(() => {
        // Get real-time updates from the database using onSnapshot()
        const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
            const tasks = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            setTasks(tasks);
        });

        // Cleanup subscription on unmount
        return () => unsub();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        titleRef.current.focus();

        // Add a new document with an auto-generated id.
        const docRef = doc(collection(db, "tasks"));

        await setDoc(docRef, {
            title: formData.title,
            description: formData.description,
            createdOn: new Date(),
            status: formData.status
        });

        setFormData({ title: "", description: "", status: "To Do" });
    }

    async function removeTask(id) {
        // Deleting a document from the Firestore
        const docRef = doc(db, "tasks", id);
        await deleteDoc(docRef);
    }

    async function updateStatus(id, newStatus) {
        // Updating a document in the Firestore
        const docRef = doc(db, "tasks", id);
        await updateDoc(docRef, { status: newStatus });
    }

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

                {/* Form for creating a task */}
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

            {/* Section where submitted tasks will be displayed */}
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
                                    onChange={(e) => updateStatus(task.id, e.target.value)}
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
                                        // passing the task id instead of index of the array to remove the document from the database
                                        removeTask(task.id);
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

// Row component to introduce a new row section in the form
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
