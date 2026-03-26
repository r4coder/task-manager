import { useState } from "react";
import API from "../services/api";

export default function TaskForm({ fetchTasks }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Todo",
    priority: "Low",
    dueDate: "",
  });

  const handleSubmit = async () => {
    try {
      if (!task.title) {
        alert("Title required");
        return;
      }

      console.log("Sending:", task); // 🔥 debug

      await API.post("/tasks", task);

      // 🔥 REFRESH TASKS
      await fetchTasks();

      // 🔥 RESET FORM (VERY IMPORTANT)
      setTask({
        title: "",
        description: "",
        status: "Todo",
        priority: "Low",
        dueDate: "",
      });

    } catch (err) {
      console.log(err.response?.data);
      alert("Task add failed");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">

      <input
        placeholder="Title"
        className="border p-2 mb-2 w-full"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      <input
        placeholder="Description"
        className="border p-2 mb-2 w-full"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <select
        className="border p-2 mb-2"
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
      >
        <option>Todo</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <select
        className="border p-2 mb-2"
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="date"
        className="border p-2 mb-2"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
}