import { useEffect, useState } from "react";
import API from "../services/api";

export default function Analytics() {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/tasks/analytics").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h3>Analytics</h3>
      <p>Total: {data.total}</p>
      <p>Completed: {data.completed}</p>
      <p>Pending: {data.pending}</p>
      <p>Completion: {Math.round(data.percentage || 0)}%</p>
    </div>
  );
}