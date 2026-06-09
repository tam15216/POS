import { useState, useRef, useEffect } from "react";

export default function ProductCategory({ value, onChange, categories = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const selectedCategory = categories.find(
      (item) => String(item.Category_id) === String(value),
    );
    if (selectedCategory) {
      setSearchTerm(selectedCategory.Category_name);
    } else if (value === "") {
      setSearchTerm("");
    }
  }, [value, categories]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        const selectedCategory = categories.find(
          (item) => String(item.Category_id) === String(value),
        );
        setSearchTerm(selectedCategory ? selectedCategory.Category_name : "");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value, categories]);

  const filteredCategories = categories.filter((item) =>
    item.Category_name?.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      <input
        type="text"
        placeholder="เลือกหมวดหมู่"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
          if (e.target.value === "") {
            onChange(""); 
          }
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 transition bg-white border border-purple-200 shadow-sm outline-none rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-300"
      />

      <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 pointer-events-none">
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-20 w-full mt-1 overflow-y-auto bg-white border border-purple-100 shadow-lg max-h-60 rounded-xl">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setSearchTerm("");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-400 transition hover:bg-purple-50 border-b border-gray-50"
          >
            Select Category (ว่าง)
          </button>

          {filteredCategories.length === 0 ? (
            <div className="px-4 py-3 text-sm text-center text-gray-400">
              ไม่พบหมวดหมู่
            </div>
          ) : (
            filteredCategories.map((item) => (
              <button
                key={item.Category_id}
                type="button"
                onClick={() => {
                  onChange(item.Category_id);
                  setSearchTerm(item.Category_name);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition hover:bg-purple-50 ${
                  String(value) === String(item.Category_id)
                    ? "bg-purple-100 text-purple-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {item.Category_name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
