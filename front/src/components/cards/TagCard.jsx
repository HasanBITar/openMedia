import React, { useState } from "react";

function TagCard({ id, name, color }) {
  const [toDelete, setDelete] = useState(false);
  const [Selected, setSelect] = useState(false);

  const handleDelete = () => {
    setDelete(true);
  };
  const handleSelect = () => {
    if (Selected) setSelect(false);
    else setSelect(true);
  };

  return (
    <div
      className={
        toDelete
          ? "hidden"
          : "mt-6 justify-center inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
      }
      style={
        Selected
          ? { backgroundColor: "#1e40af", color: "#ffffff" }
          : { backgroundColor: "#bfdbfe", color: "#1d4ed8" }
      }
    >
      <div
        className="  justify-center inline-flex items-center  px-3 rounded-full text-sm font-medium "
        onClick={handleSelect}
      >
        <div
          className="rounded-full w-3 h-3 flex mr-2"
          style={{ backgroundColor: color }}
        />
        {name}
      </div>
      <button
        className="ml-2 text-blue-700 hover:text-blue-900 focus:outline-none"
        onClick={handleDelete}
        type="button"
      >
        &times;
      </button>
    </div>
  );
}

export default TagCard;
