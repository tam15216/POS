import { useState } from "react";

export default function Categoryform({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      category_name: name,
    });
    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="ชื่อหมวดหมู่"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-3 text-gray-700 placeholder-gray-400 transition border border-purple-200 outline-none w-72 rounded-xl bg-purple-50 focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
      />

      <button
        type="submit"
        className="px-5 py-3 font-medium text-white transition bg-purple-500 shadow-md rounded-xl hover:bg-purple-600 whitespace-nowrap"
      >
        เพิ่มหมวดหมู่
      </button>
    </form>
  );
}
