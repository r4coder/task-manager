import { useEffect, useState } from "react";
import API from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔥 FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    return (
      (statusFilter === "All" || task.status === statusFilter) &&
      (priorityFilter === "All" || task.priority === priorityFilter) &&
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  // 🔥 ANALYTICS
  const total = filteredTasks.length;
  const completed = filteredTasks.filter(t => t.status === "Done").length;
  const pending = filteredTasks.filter(t => t.status !== "Done").length;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* 🔥 FILTERS */}
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-wrap gap-3">

        {/* Search */}
        <input
          placeholder="Search by title..."
          className="border p-2"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Status Filter */}
        <select
          className="border p-2"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        {/* Priority Filter */}
        <select
          className="border p-2"
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p>Total</p>
          <h2>{total}</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>Completed</p>
          <h2>{completed}</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p>Pending</p>
          <h2>{pending}</h2>
        </div>
      </div>

      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />

    </div>
  );
}