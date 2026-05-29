export default function AddToCartButton({ stock, onClick }) {
  const isOutOfStock = stock <= 0;

  return (
    <button
      disabled={isOutOfStock}
      onClick={onClick}
      className={`
        w-full
        py-3
        mt-6
        font-medium
        text-white
        transition
        shadow-sm
        rounded-xl

        ${
          isOutOfStock
            ? "bg-red-500 cursor-not-allowed"
            : "bg-purple-500 hover:bg-purple-600"
        }
      `}
    >
      {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
    </button>
  );
}
