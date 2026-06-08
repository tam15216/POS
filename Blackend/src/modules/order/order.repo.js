const db = require('../../config/database');
const checkStockForUpdate = async (conn, productId) => {
    const [rows] = await conn.query(
        'SELECT Qty FROM Stock WHERE Product_id = ? FOR UPDATE',
        [productId]
    );
    return rows;
};

const insertSale = async (conn, billNo, userId) => {
    const [result] = await conn.query(
        `INSERT INTO Sale (Bill_no, Status, Created_by) VALUES (?, 'paid', ?)`,
        [billNo, userId]
    );
    return result.insertId;
};

const getProductPrice = async (conn, productId) => {
    const [rows] = await conn.query(
        'SELECT Product_price FROM Product WHERE Product_id = ?',
        [productId]
    );
    return rows[0]?.Product_price;
};

const insertSaleItem = async (conn, saleId, item, price, totalPrice) => {
    await conn.query(
        `INSERT INTO Sale_item (Sale_id, Product_id, Qty, Unit_price, Total_price) VALUES (?, ?, ?, ?, ?)`,
        [saleId, item.product_id, item.qty, price, totalPrice]
    );
};

const updateStockDecrease = async (conn, productId, qty) => {
    const [result] = await conn.query(
        'UPDATE Stock SET Qty = Qty - ? WHERE Product_id = ? AND Qty >= ?',
        [qty, productId, qty]
    );
    return result.affectedRows > 0;
};

const insertStockLog = async (conn, productId, refType, refId, qtyChange) => {
    await conn.query(
        `INSERT INTO Stock_log (Product_id, Ref_type, Ref_id, Qty_change) VALUES (?, ?, ?, ?)`,
        [productId, refType, refId, qtyChange]
    );
};

const updateSaleTotal = async (conn, saleId, total) => {
    await conn.query(
        `UPDATE Sale SET Total_amount = ?, Net_amount = ? WHERE Sale_id = ?`,
        [total, total, saleId]
    );
};

const insertPayment = async (conn, saleId, paymentMethod, total) => {
    await conn.query(
        `INSERT INTO Payment (Sale_id, Payment_method, Amount) VALUES (?, ?, ?)`,
        [saleId, paymentMethod, total]
    );
};

const checkSaleStatusForUpdate = async (conn, saleId) => {
    const [rows] = await conn.query(
        'SELECT Status FROM Sale WHERE Sale_id = ? FOR UPDATE',
        [saleId]
    );
    return rows;
};

const getSaleItems = async (conn, saleId) => {
    const [rows] = await conn.query(
        'SELECT Product_id, Qty FROM Sale_item WHERE Sale_id = ?',
        [saleId]
    );
    return rows;
};

const updateStockIncrease = async (conn, productId, qty) => {
    await conn.query(
        'UPDATE Stock SET Qty = Qty + ? WHERE Product_id = ?',
        [qty, productId]
    );
};

const updateSaleStatus = async (conn, saleId, status) => {
    await conn.query(
        `UPDATE Sale SET Status = ? WHERE Sale_id = ?`,
        [status, saleId]
    );
};

const getOrders = async () => {
    const [rows] = await db.query(`
        SELECT 
            s.*,                 
            u.Full_name AS seller_name  
        FROM Sale s
        LEFT JOIN user u ON s.Created_by = u.User_id 
        ORDER BY s.Sale_id DESC
    `);

    return rows;
};

const getOrderById = async (saleId) => {
    const [rows] = await db.query(`
        SELECT *
        FROM Sale
        WHERE Sale_id = ?
    `, [saleId]);

    return rows[0];
};

const getOrderDetail = async (saleId) => {
    const [saleRows] = await db.query(`
        SELECT *
        FROM Sale
        WHERE Sale_id = ?
    `, [saleId]);

    const [paymentRows] = await db.query(`
        SELECT *
        FROM Payment
        WHERE Sale_id = ?
    `, [saleId]);

    const [itemRows] = await db.query(`
        SELECT
            si.Sale_item_id,
            si.Product_id,
            p.Product_name,
            si.Qty,
            si.Unit_price,
            si.Total_price
        FROM Sale_item si
        JOIN Product p
            ON p.Product_id = si.Product_id
        WHERE si.Sale_id = ?
    `, [saleId]);

    return {
        sale: saleRows[0],
        payment: paymentRows[0],
        items: itemRows
    };
};

module.exports = {
    checkStockForUpdate,
    insertSale,
    getProductPrice,
    insertSaleItem,
    updateStockDecrease,
    insertStockLog,
    updateSaleTotal,
    insertPayment,
    checkSaleStatusForUpdate,
    getSaleItems,
    updateStockIncrease,
    updateSaleStatus,
    getOrders,
    getOrderById,
    getOrderDetail
};