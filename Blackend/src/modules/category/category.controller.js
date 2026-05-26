const service = require('./category.service');

const createCategory = async (req , res) => {
    try{
        const result = await service.addCategory(req.body.category_name);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await service.getCategories();
        res.json(categories);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const result = await service.deleteCategory(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { createCategory, getAllCategories, deleteCategory };