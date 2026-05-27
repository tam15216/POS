const repo = require('./stock.repo');

const validateQty = (qty) => {
   const numberQty = Number(qty);
   if (isNaN(numberQty) || numberQty <= 0) {
       throw new Error('qty must be a positive number');
   }
   return numberQty;
};

const stockIn = async (data) => {
    if (!data.product_id || !data.qty){
        throw new Error('product_id and qty required');
    }
    validateQty(data.qty);

    return await repo.stockIn(data.product_id, data.qty);
};

const stockOut = async (data) => {
    if (!data.product_id || !data.qty){
        throw new Error('product_id and qty required');
    }
    validateQty(data.qty);

    return await repo.stockOut(data.product_id, data.qty);
};

const getStocks = async () => {
    return await repo.getStocks();
}

const getStockHistory = async () => {
    return await repo.getStockHistory();
}

module.exports = { stockIn, stockOut, getStocks, getStockHistory };