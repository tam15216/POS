const productRepo = require('./product.repo');

// ดึงสินค้า
const getProducts = async () => {
    return await productRepo.getAllProducts();
};

// ดึงสินค้าตาม ID
const getProductByid = async (id) => {
    if (!id) {
        throw new Error('Product ID is required');
    }
    return await productRepo.getProductById(id);
};


// เพิ่มสินค้า
const addProduct = async (data) => {
    if (!data.name || !data.price || !data.category_id) {
        throw new Error ('Product name, price, and category are required');
    }
    return await productRepo.createProduct(data);
};

// ลบสินค้า
const deleteProduct = async (id) => {
    if (!id) {
        throw new Error('Product ID is required');
    }

    const product = await productRepo.getProductById(id);
    if (!product) {
        throw new Error('Product not found');
    }
    return await productRepo.deleteProduct(id);
}


module.exports = {
    getProducts,
    addProduct,
    getProductByid,
    deleteProduct
};
