import { useState, useEffect } from "react";

export default function ProductOptionModal({
  isOpen,
  onClose,
  product,
  options = [],
  onConfirm,
}) {
  const sweetnessOptions = options.filter(
    (opt) =>
      opt.Option_name.includes("หวาน") || opt.Option_name.includes("ไม่"),
  );
  const toppingOptions = options.filter(
    (opt) =>
      !opt.Option_name.includes("หวาน") && !opt.Option_name.includes("ไม่"),
  );

  const [selectedSweetness, setSelectedSweetness] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedSweetness(sweetnessOptions[0] || null);
      setSelectedToppings([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToppingChange = (topping) => {
    const isExist = selectedToppings.find(
      (t) => t.Option_id === topping.Option_id,
    );
    if (isExist) {
      setSelectedToppings(
        selectedToppings.filter((t) => t.Option_id !== topping.Option_id),
      );
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleSave = () => {
    const finalOptions = [selectedSweetness, ...selectedToppings].filter(
      Boolean,
    );
    onConfirm(product, finalOptions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 duration-150 bg-white shadow-2xl rounded-3xl animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b">
          <h3 className="text-xl font-bold text-gray-800">
            {product?.Product_name}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="py-4 space-y-5 max-h-[350px] overflow-y-auto">
          {sweetnessOptions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-purple-700">
                ระดับความหวาน
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {sweetnessOptions.map((opt) => (
                  <label
                    key={opt.Option_id}
                    className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer ${selectedSweetness?.Option_id === opt.Option_id ? "border-purple-500 bg-purple-50 text-purple-700" : ""}`}
                  >
                    <input
                      type="radio"
                      name="sweetness"
                      checked={selectedSweetness?.Option_id === opt.Option_id}
                      onChange={() => setSelectedSweetness(opt)}
                      className="text-purple-600"
                    />
                    <span className="text-sm">{opt.Option_name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {toppingOptions.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-purple-700">
                ท็อปปิ้งเพิ่มเติม
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {toppingOptions.map((opt) => {
                  const isChecked = selectedToppings.some(
                    (t) => t.Option_id === opt.Option_id,
                  );
                  return (
                    <label
                      key={opt.Option_id}
                      className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer ${isChecked ? "border-purple-500 bg-purple-50 text-purple-700" : ""}`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToppingChange(opt)}
                          className="text-purple-600"
                        />
                        <span className="text-sm">{opt.Option_name}</span>
                      </div>
                      <span className="text-sm font-semibold text-purple-600">
                        +฿{opt.Price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 bg-gray-100 rounded-xl text-gray-600"
          >
            ปิด
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="py-2.5 bg-purple-600 text-white rounded-xl shadow-md"
          >
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  );
}
