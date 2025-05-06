import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { 
  FaHistory, 
  FaChevronDown, 
  FaChevronUp, 
  FaQuestion, 
  FaRobot,
  FaTrash,
  FaSearch,
  FaRegClock
} from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import { format } from 'date-fns';

const History = () => {
  const [history, setHistory] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = () => {
    fetch("/api/history")
      .then((res) => res.json())
      .then(setHistory)
      .catch((err) => console.error("Error fetching history:", err));
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const deleteHistoryItem = async (id, e) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await fetch(`/api/history/${id}`, {
        method: "DELETE",
      });
      fetchHistory();
    } catch (err) {
      console.error("Error deleting history item:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const clearAllHistory = async () => {
    setIsClearing(true);
    try {
      await fetch("/api/history", {
        method: "DELETE",
      });
      fetchHistory();
    } catch (err) {
      console.error("Error clearing history:", err);
    } finally {
      setIsClearing(false);
    }
  };

  const filteredHistory = history.filter(entry => 
    entry.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100">
              <BsClockHistory className="text-lg text-blue-500" />
            </div>
            <h2 className="text-lg font-semibold">Chat History</h2>
          </div>
          
          {filteredHistory.length > 0 && (
            <button
              onClick={clearAllHistory}
              disabled={isClearing}
              className={`text-xs px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-red-500 ${
                isClearing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isClearing ? "Clearing..." : "Clear All"}
            </button>
          )}
        </div>
        
        {/* Search bar */}
        <div className="relative flex items-center rounded-lg mt-3 overflow-hidden bg-gray-100">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 focus:outline-none bg-gray-100 text-black"
          />
        </div>
      </div>

      {/* History Items */}
      {filteredHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 p-6 text-center bg-gray-50 text-gray-500">
          <FaHistory className="text-3xl mb-3 opacity-50" />
          <p className="text-sm">
            {searchTerm ? "No matching history found" : "No history available"}
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {filteredHistory.map((entry, index) => (
            <div
              key={entry._id || index}
              className="p-3 rounded-lg cursor-pointer bg-white hover:bg-gray-50 shadow-sm"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <div className="p-1.5 rounded-md mt-0.5 bg-gray-100">
                    <FaQuestion className="text-xs text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="line-clamp-2 break-words text-sm font-medium">{entry.question}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <FaRegClock className="text-xs text-gray-400" />
                      <span className="text-xs text-gray-400">
                        {format(new Date(entry.timestamp), 'MMM d, h:mm a')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => deleteHistoryItem(entry._id, e)}
                    disabled={isDeleting}
                    className={`p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-red-500 ${
                      isDeleting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    title="Delete this item"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                  {expandedIndex === index ? (
                    <FaChevronUp className="text-gray-400 text-xs" />
                  ) : (
                    <FaChevronDown className="text-gray-400 text-xs" />
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedIndex === index && (
                <div className="mt-3 p-3 rounded-md bg-gray-100">
                  <div className="flex gap-2">
                    <div className="p-1.5 rounded-md bg-gray-200">
                      <FaRobot className="text-xs text-green-600" />
                    </div>
                    <div className="prose prose-sm max-w-none flex-1">
                      <ReactMarkdown>{entry.answer}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;