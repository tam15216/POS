const productService = require('./product.service');

const getProducts = async (req , res) => {
    try{
        const data = await productService.getProducts();
        res.json(data);
    } catch (err){
        res.status(500).json({ error: err.message});
    }
};

const getnotallProducts = async (req , res) => {
    try{
        const data = await productService.getProductsnotall();
        res.json(data);
    } catch (err){
        res.status(500).json({ error: err.message});
    }
};

const createProduct = async (req , res) => {
    try{
        const result = await productService.addProduct(req.body);
        res.json({ message: 'Product created' , data: result})
    }catch (err) {
        res.status(400).json({ error: err.message});
    }
};

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

const toggleProduct = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
        const deleted = await productService.toggleProduct(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deactivated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProduct = async (req, res) => {

    const { id } = req.params;

    try {
        const result = await productService.updateProduct(id, req.body);
        res.json({ message: 'Product updated', data: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProductsByType = async (req, res) => {
    try {
        const { type } = req.query; 
        const data = await productService.getProductsByType(type);
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    toggleProduct,
    updateProduct,
    getnotallProducts,
    getProductsByType
};
