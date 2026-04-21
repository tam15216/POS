const repo = require('./stock.repo');

const addStock = async (data) => {
    if (!data.product_id || !data.qty){
        throw new Error('product_id and aty required');
    }

    return await repo.addStock(data.product_id, data.qty);
};

module.exports = { addStock };