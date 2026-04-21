const productService = require('./product.service');

// GET /prodycts
const getProducts = async (req , res) => {
    try{
        const data = await productService.getProducts();
        res.json(data);
    } catch (err){
        res.status(500).json({ error: err.message});
    }
};

// POST /products
const createProduct = async (req , res) => {
    try{
        const result = await productService.addProduct(req.body);
        res.json({ message: 'Product created' , data: result})
    }catch (err) {
        res.status(400).json({ error: err.message});
    }
};

// GET /prodycts/:id
const getProductById = async (req , res) =>{
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
        const product = await productService.getProductByid(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProductById,
};