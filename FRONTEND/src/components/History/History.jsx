import { useEffect, useMemo, useState } from "react";
import {
  FaCopy,
  FaArrowUpRightFromSquare,
  FaTrash,
} from "react-icons/fa6";
import toast from "react-hot-toast";
import { getHistory, deleteUrl } from "../../services/urlService";
import "./History.css";

const BASE_URL = "http://localhost:3000";

const History = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getHistory();
        setHistory(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const query = search.toLowerCase();

      return (
        item.full_url.toLowerCase().includes(query) ||
        item.short_url.toLowerCase().includes(query)
      );
    });
  }, [history, search]);

  const copyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy URL");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this URL?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUrl(id);

      setHistory((prevHistory) =>
        prevHistory.filter((item) => item._id !== id)
      );

      toast.success("URL deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete URL");
    }
  };

  if (loading) {
    return (
      <p className="history-loading">
        Loading history...
      </p>
    );
  }

  return (
    <div className="history-container">
      <h2>Recent URLs</h2>

      <input
        type="text"
        placeholder="🔍 Search by original or short URL..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mt-4 mb-6 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredHistory.length === 0 ? (
        <p className="history-loading">
          No URLs found.
        </p>
      ) : (
        filteredHistory.map((item) => (
          <div
            className="history-card"
            key={item._id}
          >
            <div className="history-info">

              <p>
                <strong>Original:</strong>{" "}
                <a
                  href={item.full_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.full_url}
                </a>
              </p>

              <p>
                <strong>Short:</strong>{" "}
                <a
                  href={`${BASE_URL}/${item.short_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${BASE_URL}/${item.short_url}`}
                </a>
              </p>

              <p>
                <strong>Clicks:</strong>{" "}
                {item.clicks}
              </p>

            </div>

            <div className="history-actions">

              <button
                onClick={() =>
                  copyUrl(
                    `${BASE_URL}/${item.short_url}`
                  )
                }
              >
                <FaCopy /> Copy
              </button>

              <a
                href={`${BASE_URL}/${item.short_url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaArrowUpRightFromSquare /> Visit
              </a>

              <button
                onClick={() =>
                  handleDelete(item._id)
                }
                className="delete-btn"
              >
                <FaTrash /> Delete
              </button>

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default History;