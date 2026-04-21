const service = require('./order.service');

const createOrder = async (req , res) => {
    try{
        const result = await service.createOrder({...req.body, user_id: req.user.id});
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
};

const cancelOrder = async (req , res) => {
    try {
        const saleId = req.params.id;
        const result = await service.cancelOrder(saleId);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
};

module.exports = { createOrder , cancelOrder };