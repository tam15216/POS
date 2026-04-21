const db = require('../../config/database');

const createOrder = async (data) => {
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const { items, payment_method, user_id } = data;
        let total = 0;
        
        //  1. เช็ค stock + lock
        for (const item of items) {
            const [rows] = await conn.query(
                'SELECT Qty FROM Stock WHERE Product_id = ? FOR UPDATE',
                [item.product_id]
            );

            if (rows.length === 0){
                throw new Error(`Product ${item.product_id} has no stock`);
            }

            if (rows[0].Qty < item.qty){
                throw new Error(`Stock not enough for product ${item.product_id}`);
            }
        }
        // 2. สร้าง Sale
        const [saleResult] = await conn.query(
            `INSERT INTO Sale (Bill_no, Status, Created_by)
            VALUES (?, 'paid' , ?)`,
            [`BILL-${Date.now()}`, user_id]
        );

        const saleId = saleResult.insertId;
        //3. วนสินค้า
        for( const item of items){
            const [product] = await conn.query(
                'SELECT Product_price FROM Product WHERE Product_id = ?',
                [item.product_id]
            );

            const price = product[0].Product_price;
            const totalPrice = price * item.qty;

            total += totalPrice;
            // sale item
            await conn.query(
                `INSERT INTO Sale_item
                (Sale_id, Product_id, Qty, Unit_price, Total_price)
                VALUES (?, ?, ?, ?, ?)`,
                [saleId, item.product_id, item.qty, price, totalPrice]
            );

            // ลด stock
            await conn.query(
                'UPDATE Stock SET Qty = Qty - ? WHERE Product_id = ? AND Qty >= ?',
                [item.qty ,item.product_id, item.qty]
            );

            if (conn.affectedRows === 0){
                throw new Error(`Failed to update stock for product ${item.product_id}`);
            }

            // log
            await conn.query(
                `INSERT INTO Stock_log
                (Product_id, Ref_type, Ref_id, Qty_change)
                VALUES (?, 'sale', ?, ?)`,
                [item.product_id, saleId, -item.qty]
            );
        }

        // 4.update ยอด
        await conn.query(
            `UPDATE Sale SET Total_amount = ?, Net_amount = ? WHERE Sale_id = ?`,
            [total, total ,saleId]
        );

        // 5. payment
        await conn.query(
            `INSERT INTO Payment (Sale_id, Payment_method, Amount)
            VALUES (?, ?, ?)`,
            [saleId, payment_method, total]
        );

        await conn.commit();
        return { message: 'Order success', saleId}
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
        const [saleRows] = await conn.query(
            'SELECT Status FROM Sale WHERE Sale_id = ? FOR UPDATE',
            [saleId]
        );

        if (saleRows.length === 0) {
            throw new Error('Order not found');
        }

        if (saleRows[0].Status === 'cancelled') {
            throw new Error('Order already cancelled');
        }

        // 2. ดึงรายการสินค้า
        const [items] = await conn.query(
            'SELECT Product_id, Qty FROM Sale_item WHERE Sale_id = ?',
            [saleId]
        );

        // 3. คืน stock
        for (const item of items) {
            await conn.query(
                'UPDATE Stock SET Qty = Qty + ? WHERE Product_id = ?',
                [item.Qty, item.Product_id]
            );

            // log
            await conn.query(
                `INSERT INTO Stock_log
                (Product_id, Ref_type, Ref_id, Qty_change)
                VALUES (?, 'cancel', ?, ?)`,
                [item.Product_id, saleId, item.Qty]
            );
        }

        // 4. update status
        await conn.query(
            `UPDATE Sale SET Status = 'cancelled' WHERE Sale_id = ?`,
            [saleId]
        );

        await conn.commit();

        return { message: 'Order cancelled'};
        
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};

module.exports = { createOrder , cancelOrder  };

