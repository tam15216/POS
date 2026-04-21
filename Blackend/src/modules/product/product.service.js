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
    if (!data.name || !data.price){
        throw new Error ('Product name and price are required');
    }
    return await productRepo.createProduct(data);
};

module.exports = {
    getProducts,
    addProduct,
    getProductByid
};