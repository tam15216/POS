const service = require('./category.service');

const createCategory = async (req , res) => {
    try{
        const result = await service.addCategory(req.body.name);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
};

module.exports = {createCategory};