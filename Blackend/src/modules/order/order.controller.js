const service = require('./order.service');

const createOrder = async (req , res) => {
    try{
        const result = await service.createOrder({...req.body, user_id: req.user.user_id});
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

const getOrders = async (req, res) => {
    try {
        const data = await service.getOrders();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const saleId = req.params.id;
        const data = await service.getOrderById(saleId);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrderDetail = async (req, res) => {
    try {
        const saleId = req.params.id;

        const data = await service.getOrderDetail(saleId);

        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

const getOptions = async (req, res) => {
    try {
        const data = await service.getOptionsList();
        res.status(200).json(data);
    } catch (err) {
        console.error("Controller Error (getOptions):", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createOrder , cancelOrder, getOrders, getOrderById , getOrderDetail , getOptions};