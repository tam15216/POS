import { useState, useRef, useEffect } from "react";

export default function OptionSearchSelect({
  value,
  onChange,
  optionsList = [],
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const selectedOption = optionsList.find(
      (opt) => String(opt.Option_id) === String(value),
    );
    if (selectedOption) {
      setSearchTerm(selectedOption.Option_name);
    } else if (value === "") {
      setSearchTerm("");
    }
  }, [value, optionsList]);


  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        const selectedOption = optionsList.find(
          (opt) => String(opt.Option_id) === String(value),
        );
        setSearchTerm(selectedOption ? selectedOption.Option_name : "");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value, optionsList]);


  const filteredOptions = optionsList.filter((opt) =>
    opt.Option_name?.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      <input
        type="text"
        placeholder="พิมพ์ค้นหารายการ Option"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
          if (e.target.value === "") {
            onChange("");
          }
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition bg-white border border-gray-200 outline-none rounded-xl focus:border-purple-500"
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
        <div className="absolute z-20 w-full mt-1 overflow-y-auto bg-white border border-purple-100 shadow-lg max-h-60 rounded-xl custom-scrollbar">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setSearchTerm("");
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-xs text-left text-gray-400 transition border-b hover:bg-purple-50 border-gray-50"
          >
            -- ล้างค่าการเลือก --
          </button>

          {filteredOptions.length === 0 ? (
            <div className="px-4 py-4 text-xs text-center text-gray-400">
              ไม่พบข้อมูลออปชันที่ระบุ
            </div>
          ) : (
            filteredOptions.map((opt) => {
              const isSelected = String(value) === String(opt.Option_id);

              return (
                <button
                  key={opt.Option_id}
                  type="button"
                  onClick={() => {
                    onChange(opt.Option_id);
                    setSearchTerm(opt.Option_name);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2 text-xs transition hover:bg-purple-50 ${
                    isSelected
                      ? "bg-purple-100 text-purple-700 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  <span>{opt.Option_name}</span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    +฿{opt.Price}
                  </span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
