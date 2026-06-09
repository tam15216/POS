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
    if (!data.name || !data.price || !data.category_id || !data.cost_price) {
        throw new Error ('Product name, price, cost price, and category are required');
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

    if (!data.name || !data.price || !data.category_id || !data.cost_price) {
        throw new Error('Product name, price, cost price, and category are required');
    }

    await productRepo.updateProduct(id, data);
    return{id, ...data};

};


module.exports = {
    getProducts,
    addProduct,
    getProductByid,
    toggleProduct,
    updateProduct,
    getProductsnotall
};

