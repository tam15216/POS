const db =require('../../config/database');

const addStock = async (product_id, qty) => {
    const [rows] = await db.query(
        'SELECT * FROM Stock WHERE Product_id = ?',
        [product_id]
    );

    if(rows.length === 0){
        await db.query(
            'INSERT INTO Stock (Product_id, Qty) VALUES (?,?)',
            [product_id , qty]
        );
    } else {
        await db.query(
            'UPDATE Stock SET Qty = Qty + ? WHERE Product_id = ?',
            [qty, product_id]
        );
    }

    await db.query(
        `INSERT INTO Stock_log (Product_id, Ref_type, Qty_change)
        VALUES (? , 'import' , ?)`,
        [product_id , qty]
    );
};

module.exports = {addStock};