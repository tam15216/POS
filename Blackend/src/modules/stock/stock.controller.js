const service = require('./stock.service');

const addStock = async (req , res) => {
    try {
        await service.addStock(req.body);
        res.json({ message: 'Stock updated'});
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
};

module.exports = { addStock };