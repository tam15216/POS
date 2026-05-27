const service = require('./stock.service');

const getStocks = async (req , res) => {
    try {
        const data = await service.getStocks();
        res.json(data);
    }catch (err) {
        res.status(500).json({ error: err.message});
    }
};

const getStockHistory = async (req , res) => {
    try {
        const data = await service.getStockHistory();
        res.json(data);
    }catch (err) {
        res.status(500).json({ error: err.message});
    }
};

const stockIn = async (req , res) => {
    try {
        await service.stockIn(req.body);
        res.json({ message: 'Stock imported'});
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
};

const stockOut = async (req , res) => {
        try {
            await service.stockOut(req.body);
            res.json({ message: 'Stock removed'});
        } catch (err) {
            res.status(400).json({ error: err.message});
        }
};


module.exports = { stockIn, stockOut, getStocks, getStockHistory };