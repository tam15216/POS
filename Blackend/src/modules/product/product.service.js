const productRepo = require('./product.repo');

// ดึงสินค้า
const getProducts = async () => {
    return await productRepo.getAllProducts();
};

const getProductsnotall = async () => {
    return await productRepo.getnotAllProducts();
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
    if (!data.name || !data.price || !data.category_id || !data.cost_price || !data.product_type) {
        throw new Error('Product name, price, cost price, category, and product type are required');
    }
    return await productRepo.createProduct(data);
};

const toggleProduct = async (id) => {
    if (!id) {
        throw new Error('Product ID is required');
    }

    const product = await productRepo.getProductById(id);
    if (!product) {
        throw new Error('Product not found');
    }
    return await productRepo.toggleProduct(id);
}

// อัพเดตสินค้า
const updateProduct = async (id, data) => {
    if (!id) {
        throw new Error('Product ID is required');
    }

    const product = await productRepo.getProductById(id);
    if (!product) {
        throw new Error('Product not found');
    }

    // เพิ่มการตรวจสอบฟิลด์ product_type ในเงื่อนไข Validation
    if (!data.name || !data.price || !data.category_id || !data.cost_price || !data.product_type) {
        throw new Error('Product name, price, cost price, category, and product type are required');
    }

    await productRepo.updateProduct(id, data);
    return { id, ...data };
};

const getProductsByType = async (productType) => {
    if (!['ready_made', 'made_to_order'].includes(productType)) {
        throw new Error('Invalid product type');
    }
    return await productRepo.getProductsByType(productType);
};


module.exports = {
    getProducts,
    addProduct,
    getProductByid,
    toggleProduct,
    updateProduct,
    getProductsnotall,
    getProductsByType
};

