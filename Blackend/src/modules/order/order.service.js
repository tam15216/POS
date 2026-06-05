// order.service.js
const db = require('../../config/database');
const orderRepo = require('./order.repo');

const createOrder = async (data) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const { items, payment_method, user_id } = data;
        let total = 0;

        // 1. เช็ค stock + lock
        for (const item of items) {
            const rows = await orderRepo.checkStockForUpdate(conn, item.product_id);

            if (rows.length === 0) {
                throw new Error(`Product ${item.product_id} has no stock`);
            }

            if (rows[0].Qty < item.qty) {
                throw new Error(`Stock not enough for product ${item.product_id}`);
            }
        }

        // 2. สร้าง Sale
        const billNo = `BILL-${Date.now()}`;
        const saleId = await orderRepo.insertSale(conn, billNo, user_id);

        // 3. วนสินค้า
        for (const item of items) {
            const price = await orderRepo.getProductPrice(conn, item.product_id);
            const totalPrice = price * item.qty;
            total += totalPrice;

            // sale item
            await orderRepo.insertSaleItem(conn, saleId, item, price, totalPrice);
            
            // update stock
            const isUpdated = await orderRepo.updateStockDecrease(conn, item.product_id, item.qty);
            if (!isUpdated) {
                throw new Error(`Failed to update stock for product ${item.product_id}`);
            }

            // log
            await orderRepo.insertStockLog(conn, item.product_id, 'sale', saleId, -item.qty);
        }

        // 4. update ยอด
        await orderRepo.updateSaleTotal(conn, saleId, total);

        // 5. payment
        await orderRepo.insertPayment(conn, saleId, payment_method, total);

        await conn.commit();
        return { message: 'Order success', saleId };
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};

const cancelOrder = async (saleId) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        // 1. เช็คสถานนะ order
        const saleRows = await orderRepo.checkSaleStatusForUpdate(conn, saleId);

        if (saleRows.length === 0) {
            throw new Error('Order not found');
        }

        if (saleRows[0].Status === 'cancelled') {
            throw new Error('Order already cancelled');
        }

        // 2. ดึงรายการสินค้า
        const items = await orderRepo.getSaleItems(conn, saleId);

        // 3. คืน stock
        for (const item of items) {
            await orderRepo.updateStockIncrease(conn, item.Product_id, item.Qty);
            // log
            await orderRepo.insertStockLog(conn, item.Product_id, 'cancel', saleId, item.Qty);
        }

        // 4. update status
        await orderRepo.updateSaleStatus(conn, saleId, 'cancelled');

        await conn.commit();
        return { message: 'Order cancelled' };
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};

const getOrders = async () => {
    return await orderRepo.getOrders();
};

const getOrderById = async (saleId) => {
    return await orderRepo.getOrderById(saleId);
};

const getOrderDetail = async (saleId) => {
    return await orderRepo.getOrderDetail(saleId);
};

module.exports = { createOrder, cancelOrder, getOrders, getOrderById , getOrderDetail};