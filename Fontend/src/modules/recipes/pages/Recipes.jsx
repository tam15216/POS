import useIngredients from '../../ingredients/hooks/useIngredients';
import useProductsByType from '../../products/hooks/useProductsByType';
import RecipeForm from '../components/RecipeForm';

export default function Recipes() {
    const { ingredients } = useIngredients();
    
    const { products: madeToOrderProducts, loading: productsLoading } = useProductsByType('made_to_order');

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-purple-700">สูตรสินค้า</h1>
                <p className="mt-1 text-gray-400">กำหนดวัตถุดิบและสัดส่วนการหักสต๊อกต่อหนึ่งหน่วยแก้ว</p>
            </div>
            
            {productsLoading ? (
                <p className="text-gray-400">กำลังโหลดข้อมูลสินค้า...</p>
            ) : (
                <RecipeForm products={madeToOrderProducts} ingredients={ingredients} />
            )}
        </div>
    );
}