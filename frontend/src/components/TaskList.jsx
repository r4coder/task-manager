import API from "../services/api";

export default function TaskList({ tasks, fetchTasks }) {

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const markDone = async (id) => {
    await API.put(`/tasks/${id}`, { status: "Done" });
    fetchTasks();
  };

  return (
    <div>
      {tasks.map((t) => (
        <div key={t._id} className="bg-white p-4 rounded shadow mb-2">

          <h3 className="font-bold">{t.title}</h3>
          <p>{t.description}</p>

          <p>Status: <b>{t.status}</b></p>
          <p>Priority: <b>{t.priority}</b></p>
          <p>Due: {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "N/A"}</p>

          <div className="mt-2 flex gap-2">

            <button
              onClick={() => markDone(t._id)}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Mark Done
            </button>

            <button
              onClick={() => deleteTask(t._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>

          </div>

        </div>
      ))}
    </div>
  );
}