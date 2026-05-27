const db =require('../../config/database');

const stockIn = async (product_id, qty) => {
    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();
        const [rows] = await conn.query('SELECT * FROM stock WHERE Product_id = ? FOR UPDATE', [product_id]);

        if(rows.length === 0){
            await conn.query('INSERT INTO stock (Product_id, Qty) VALUES (?, ?)', [product_id, qty]);
        } else {
            await conn.query('UPDATE stock SET Qty = Qty + ? WHERE Product_id = ?', [qty, product_id]);
        }

        await conn.query(`INSERT INTO stock_log (Product_id, Ref_type , Qty_change) VALUES (?,'import' ,?)`, [product_id, qty]);
        await conn.commit();
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        await conn.release();
    }
};

const stockOut = async (product_id, qty) => {
    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();
        const [rows] = await conn.query('SELECT * FROM stock WHERE Product_id = ? FOR UPDATE', [product_id]);

        if(rows.length === 0){
            throw new Error('No stock for this product');
        }

        const currentQty = Number(rows[0].Qty);

        if(currentQty < qty){
            throw new Error('Not enough stock');
        }

        await conn.query('UPDATE stock SET Qty = Qty - ? WHERE Product_id = ?', [qty, product_id]);
        
        await conn.query(`INSERT INTO stock_log (Product_id, Ref_type , Qty_change) VALUES (?,'adjust' ,?)`, [product_id, -qty]);
        await conn.commit();
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        await conn.release();
    }
};  

const getStocks = async () => {
    const [rows] = await db.query('SELEcT s.Stock_id, s.Product_id, p.Product_name, s.Qty FROM stock s JOIN product p ON s.Product_id = p.Product_id ORDER BY p.Product_name ASC');
    return rows;
};

const getStockHistory = async () => {
    const [rows] = await db.query('SELECT sl.Stock_log_id , sl.Product_id, p.Product_name, sl.Ref_type, sl.Qty_change, sl.Created_at FROM stock_log sl JOIN product p ON sl.Product_id = p.Product_id ORDER BY sl.Created_at DESC');
    return rows;
};

module.exports = {stockIn, stockOut, getStocks, getStockHistory};