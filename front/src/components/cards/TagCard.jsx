import React, { useState } from "react";

function TagCard({ id, name, color }) {
  const [toDelete, setDelete] = useState(false);
  const handleDelete = () => {
    setDelete(true);
  };

  return (
    <div
      className={
        toDelete
          ? "hidden"
          : "mt-6 justify-center inline-flex items-center bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
      }
    >
      <div
        className="rounded-full w-3 h-3 flex mr-2"
        style={{ backgroundColor: color }}
      />
      {name}
      <button
        className="ml-2 text-blue-700 hover:text-blue-900 focus:outline-none"
        onClick={handleDelete}
      >
        &times;
      </button>
    </div>
  );
}

export default TagCard;
