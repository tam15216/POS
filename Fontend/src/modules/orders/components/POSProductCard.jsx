import AddToCartButton from "./AddToCartButton";
export default function POSProductCard({ product, onAdd }) {
  return (
    <div className=" w-[220px] min-h-[260px] bg-white border border-purple-100 rounded-2xl shadow-sm p-5 hover:shadow-md  hover:-translate-y-1 transition flex flex-col justify-between ">
      <div>
        <div className="min-h-[72px] mb-4">
          <h3 className="text-lg font-bold leading-7 text-gray-700 line-clamp-2">
            {product.Product_name}
          </h3>
        </div>

        <p className="mb-3 text-2xl font-bold text-purple-600 ">
          ฿{product.Product_price}
        </p>
        <span className="inline-block px-2.5 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full ">
          เหลือ {product.stock_qty} ชิ้น
        </span>
      </div>
      <AddToCartButton
        stock={product.stock_qty}
        onClick={() => onAdd(product)}
      />
    </div>
  );
}
