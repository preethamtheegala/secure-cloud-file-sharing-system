import { useEffect, useState } from "react";
import api from "../services/api";

function ActivityLogs() {

  const [logs, setLogs] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res =
        await api.get(
          "/activity",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setLogs(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const filteredLogs =
    logs.filter((log) =>
      log.action
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="container py-5">

      <h1 className="mb-4">
        Activity Logs
      </h1>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search Activity..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      {filteredLogs.map(
        (log) => (

          <div
            key={log._id}
            className="glass-card mb-3"
          >

            <h5>
              {log.action}
            </h5>

            <p>
              {log.fileName}
            </p>

            <small>
              {new Date(
                log.createdAt
              ).toLocaleString()}
            </small>

          </div>

        )
      )}

    </div>
  );
}

export default ActivityLogs;