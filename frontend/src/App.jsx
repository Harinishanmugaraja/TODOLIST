import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const fetchTasks = async () => {

  try {

    const response = await axios.get(
      "http://localhost:5000/api/tasks"
    );

    setTasks(response.data);

  } catch (error) {

    console.log(error);

  }

};

const addTask = async () => {

  try {

    if (editId) {

      await axios.put(
        `http://localhost:5000/api/tasks/${editId}`,
        { title }
      );

      setEditId(null);

    } else {

      await axios.post(
        "http://localhost:5000/api/tasks",
        { title }
      );

    }

    fetchTasks();
    setTitle("");

  } catch (error) {

    console.log(error);

  }

};
const deleteTask = async (id) => {

try {

  await axios.delete(
    `http://localhost:5000/api/tasks/${id}`
  );

  fetchTasks();

} catch (error) {

  console.log(error);

}

};
useEffect(() => {
  fetchTasks();
}, []);

const editTask = (task) => {
  setTitle(task.title);
  setEditId(task._id);
};

const handleAuth = async () => {

  try {

    if (showRegister) {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert("Registration Successful");

      setShowRegister(false);

      setName("");
      setEmail("");
      setPassword("");

    } else {

      await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      alert("Login Successful");

      setIsLoggedIn(true);

      setEmail("");
      setPassword("");

    }

  } catch (error) {

    console.log(error);

    alert("Authentication Failed");

  }

};
if (!isLoggedIn) {
  return (
    <div>

      <h1>
        {showRegister ? "Register" : "Login"}
      </h1>

      {showRegister && (
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleAuth}>
  {showRegister ? "Register" : "Login"}
</button>

      <p
        onClick={() => setShowRegister(!showRegister)}
        style={{ cursor: "pointer" }}
      >
        {showRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </p>

    </div>
  );
}
  return (
    <div>

      <h1>Task Manager</h1>

      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />


      <button onClick={addTask}>
  {editId ? "Update Task" : "Add Task"}
</button>
      <div>
        {
          tasks.map((task) => (
            <div key={task._id}>
  <p>{task.title}</p>
  <button onClick={() => editTask(task)}>
  Edit
</button>
  <button onClick={() => deleteTask(task._id)}>
    Delete
  </button>
</div>
          ))
        }
      </div>

    </div>
  );
}

export default App;