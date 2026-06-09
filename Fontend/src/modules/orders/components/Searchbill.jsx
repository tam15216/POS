import React from "react";

export default function Searchbill({ value, onChange }) {
  return (
    <div className="w-full sm:w-72">
      <input
        type="text"
        placeholder="ค้นหาด้วยเลขที่บิล..."
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-purple-100 shadow-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}