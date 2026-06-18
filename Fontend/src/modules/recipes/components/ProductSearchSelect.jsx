import { useState, useRef, useEffect } from "react";

export default function ProductSearchSelect({
  value,
  onChange,
  products = [],
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const selectedProduct = products.find(
      (p) => String(p.Product_id) === String(value),
    );
    if (selectedProduct) {
      setSearchTerm(selectedProduct.Product_name);
    } else if (value === "") {
      setSearchTerm("");
    }
  }, [value, products]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        const selectedProduct = products.find(
          (p) => String(p.Product_id) === String(value),
        );
        setSearchTerm(selectedProduct ? selectedProduct.Product_name : "");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value, products]);

  const filteredProducts = products.filter((p) =>
    p.Product_name?.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      <input
        type="text"
        placeholder="พิมพ์ค้นหาชื่อสินค้า"
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
        <div className="absolute z-20 w-full mt-1 overflow-y-auto bg-white border border-purple-100 shadow-lg max-h-60 rounded-xl custom-scrollbar">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setSearchTerm("");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-400 transition hover:bg-purple-50 border-b border-gray-50"
          >
            -- ล้างค่าการเลือก --
          </button>

          {filteredProducts.length === 0 ? (
            <div className="px-4 py-4 text-sm text-center text-gray-400">
              ไม่พบข้อมูลสินค้าที่ระบุ
            </div>
          ) : (
            filteredProducts.map((p) => {
              return (
                <button
                  key={p.Product_id}
                  type="button"
                  onClick={() => {
                    onChange(p.Product_id);
                    setSearchTerm(p.Product_name);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition hover:bg-purple-50 ${
                    isSelected
                      ? "bg-purple-100 text-purple-700 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  <span>{p.Product_name}</span>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
