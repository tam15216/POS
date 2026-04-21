const db = require('../../config/database')

// ดึงสินค้าทั้งหมด
const getAllProducts = async () =>{
    const [rows] = await db.query(`
        SELECT
            p.Product_id,
            p.Product_name,
            p.Product_code,
            p.Product_price,
            c.Category_name
        FROM Product p
        LEFT JOIN Category c ON p.Category_id = c.Category_id
        `);
        return rows;
};

const getProductById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM Product WHERE Product_id = ?',
        [id]
    );
    return rows[0] || null; 
};

// เพิ่มสินค้า
const createProduct = async (data) => {
    const { name ,code , price, category_id} = data;

     const [result] = await db.query(
        `INSERT INTO Product
        (Product_name , Product_code , Product_price , Category_id)
        VALUES (?,?,?,?)
        `,
        [name , code, price , category_id]
     );
     return result;
};

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
};