import React, { useState } from "react";

const Popup = ({ isOpen, onClose, text, onRename, initialLabel }) => {
  const [newLabel, setNewLabel] = useState(initialLabel || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-3/4 max-w-lg">
        <p className="text-xl font-semibold mb-2">{text}</p>
        {onRename && (
          <div className="mt-4 ">
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
          {onRename && (
            <button
              onClick={() => onRename(newLabel)}
              className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Rename
            </button>
          )}
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
